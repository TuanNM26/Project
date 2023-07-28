using Azure.Core.GeoJson;
using CafeManageMentFormApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace CafeManageMentFormApp
{
    public partial class MenuForm : Form
    {

        public event EventHandler<ProductAddedEventArgs> ProductAdded;
        public event EventHandler<ProductUpdatedEventArgs> ProductUpdated;
        public event EventHandler<ProductDeletedEventArgs> ProductDeleted;


        public CafeManagementContext Context = new CafeManagementContext();
        public MenuForm()
        {
            InitializeComponent();
        }

        private Product selectedProduct;


        private void ShowMenu()
        {
            List<Product> menuItems = GetMenuItems();

            dgvMenu.Columns.Clear(); // Clear existing columns
            dgvMenu.Rows.Clear(); // Clear existing rows

            // Add columns to the DataGridView
            dgvMenu.Columns.Add("ProductId", "ID");
            dgvMenu.Columns.Add("Name", "Name");
            dgvMenu.Columns.Add("Price", "Price");
            dgvMenu.Columns.Add("Category", "Category");
            dgvMenu.Columns.Add("Description", "Description");
            dgvMenu.Columns["Name"].Width = 200;
            dgvMenu.Columns["Price"].Width = 200;
            dgvMenu.Columns["Category"].Width = 200;
            dgvMenu.Columns["Description"].Width = 200;

            DataGridViewImageColumn imageColumn = new DataGridViewImageColumn();
            imageColumn.HeaderText = "Image";
            imageColumn.ImageLayout = DataGridViewImageCellLayout.Zoom;
            imageColumn.Width = 450; //
            dgvMenu.Columns.Add(imageColumn);

            foreach (Product product in menuItems)
            {
                string categoryName = GetCategoryNameById(product.CategoryId);

                Image image = LoadImageFromURL(product.ImageUrl);
                if (image != null)
                {
                    // Thiết lập kích thước hiển thị của hình ảnh trong ô
                    image = new Bitmap(image, 200, 200); // Thiết lập kích thước rộng và cao của hình ảnh
                }
                dgvMenu.Rows.Add(product.ProductId, product.Name, product.Price.ToString(), categoryName, product.Description, image);
            }
        }

        private Image LoadImageFromURL(string imageURL)
        {
            try
            {
                WebClient client = new WebClient();
                byte[] imageData = client.DownloadData(imageURL);
                MemoryStream memoryStream = new MemoryStream(imageData);
                return Image.FromStream(memoryStream);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error loading image: " + ex.Message);
                return null;
            }
        }



        private List<Product> GetMenuItems()
        {

            return Context.Products.ToList();

        }

        public string GetCategoryNameById(int? categoryId)
        {
            if (categoryId.HasValue)
            {
                Category category = Context.Categories.FirstOrDefault(c => c.CategoryId == categoryId.Value);
                return category?.Name;
            }
            return string.Empty;
        }

        private void MenuForm_Load(object sender, EventArgs e)
        {

            var distinctCategory = Context.Categories
       .Select(category => new KeyValuePair<int, string>(category.CategoryId, category.Name))
       .Distinct()
       .ToList();

            cboCategory.DataSource = distinctCategory;
            cboCategory.DisplayMember = "Value"; // Hiển thị giá trị Name
            cboCategory.ValueMember = "Key";
            dgvMenu.RowTemplate.Height = 200;


            ShowMenu();

        }

        private void dgvMenu_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

            int selectedRow = e.RowIndex;
            int productID = Convert.ToInt32(dgvMenu.Rows[selectedRow].Cells["ProductId"].Value);
            selectedProduct = Context.Products.FirstOrDefault(x => x.ProductId == productID);

            if (e.RowIndex >= 0) 
            {
                DataGridViewRow row = dgvMenu.Rows[e.RowIndex];
                txtID.Text = row.Cells[0].FormattedValue.ToString();
                txtName.Text = row.Cells[1].FormattedValue.ToString();
                txtPrice.Text = row.Cells[2].FormattedValue.ToString();
                cboCategory.Text = row.Cells[3].FormattedValue.ToString();
                txtDesciption.Text = row.Cells[4].FormattedValue.ToString();

                
                string imageURL;
                object cellValue = row.Cells[5].Value;
                if (cellValue is Bitmap bitmap)
                {
                   
                    string tempPath = Path.GetTempFileName();
                    bitmap.Save(tempPath);
                    imageURL = tempPath;
                }
                else
                {
                    imageURL = cellValue.ToString();
                }

                txtURL.Text = imageURL;
            }
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            string productName = txtName.Text;
            decimal price = decimal.Parse(txtPrice.Text);
            int categoryId = int.Parse(cboCategory.SelectedValue.ToString());
            string description = txtDesciption.Text;
            string imageURL = txtURL.Text;

            using (var newContext = new CafeManagementContext())
            {

                // Tạo đối tượng mới để thêm vào cơ sở dữ liệu
                Product newProduct = new Product
                {
                    Name = productName,
                    Price = price,
                    CategoryId = categoryId,
                    Description = description,
                    ImageUrl = imageURL
                };

                // Thêm đối tượng mới vào newContext
                newContext.Products.Add(newProduct);

                // Thực hiện lưu thay đổi vào cơ sở dữ liệu
                newContext.SaveChanges();

                // Cập nhật DataGridView và hiển thị thông báo thành công
                ProductAdded?.Invoke(this, new ProductAddedEventArgs(newProduct));
                ShowMenu();


                MessageBox.Show("Product added successfully!");

                ClearFields();


            }
        }






        private void btnRefresh_Click(object sender, EventArgs e)
        {
            ShowMenu();
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (selectedProduct != null)
            {
                // Cập nhật thông tin nhân viên
                selectedProduct.Name = txtName.Text;
                selectedProduct.Price = decimal.Parse(txtPrice.Text);
                selectedProduct.CategoryId = int.Parse(cboCategory.SelectedValue.ToString());
                selectedProduct.Description = txtDesciption.Text;
                selectedProduct.ImageUrl = txtURL.Text;

                Context.SaveChanges();


                    ProductUpdated?.Invoke(this, new ProductUpdatedEventArgs(selectedProduct));


                MessageBox.Show("Update thành công");
                ShowMenu();
                ClearFields();


            }
            else
            {
                MessageBox.Show("Vui lòng chọn nhân viên cần cập nhật.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (selectedProduct != null)
            {
                // Xóa nhân viên
                Context.Products.Remove(selectedProduct);
                Context.SaveChanges();
                ProductDeleted?.Invoke(this, new ProductDeletedEventArgs(selectedProduct.ProductId));
                MessageBox.Show("Delete thành công");
                ShowMenu();

            }
            else
            {
                MessageBox.Show("Vui lòng chọn nhân viên cần xóa.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void ClearFields()
        {
            txtID.Text = "";
            txtName.Text = "";
            txtPrice.Text = "";

            cboCategory.SelectedValue = 0;
            txtDesciption.Text = "";
            txtURL.Text = "";
        }





        private void txtSearch_TextChanged(object sender, EventArgs e)
        {
            string searchFilter = txtSearch.Text.Trim();

            List<Product> filteredProducts = ApplyFilters(searchFilter);
            UpdateDataGridView(filteredProducts);
        }

        private void UpdateDataGridView(List<Product> products)
        {
            dgvMenu.Rows.Clear();

            foreach (Product product in products)
            {
                string categoryName = GetCategoryNameById(product.CategoryId);

                Image image = LoadImageFromURL(product.ImageUrl);
                if (image != null)
                {

                    image = new Bitmap(image, 200, 200);
                    dgvMenu.Rows.Add(product.ProductId, product.Name, product.Price.ToString(), categoryName, product.Description, image);
                }
            }
        }
        private List<Product> ApplyFilters(string searchFilter)
        {
            var filteredProducts = GetMenuItems();

            if (!string.IsNullOrEmpty(searchFilter))
            {
                filteredProducts = filteredProducts.Where(product =>
                    product.Name.Contains(searchFilter) ||
                    product.Category.Name.Contains(searchFilter) ||
                    product.Description.Contains(searchFilter)).ToList();
            }

            return filteredProducts;
        }


        private void btnClose_Click(object sender, EventArgs e) => Close();
    }



}
public class ProductAddedEventArgs : EventArgs
{
    public Product Product { get; }

    public ProductAddedEventArgs(Product product)
    {
        Product = product;
    }
}

public class ProductUpdatedEventArgs : EventArgs
{
    public Product UpdatedProduct { get; }

    public ProductUpdatedEventArgs(Product updatedProduct)
    {
        UpdatedProduct = updatedProduct;
    }
}

public class ProductDeletedEventArgs : EventArgs
{
    public int DeletedProductId { get; }

    public ProductDeletedEventArgs(int deletedProductId)
    {
        DeletedProductId = deletedProductId;
    }
}












