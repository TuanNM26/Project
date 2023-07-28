using CafeManageMentFormApp.Models;
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

namespace CafeManageMentFormApp
{


    public partial class OrderForm : Form
    {

        public CafeManagementContext Context = new CafeManagementContext();

        private Product selectedProduct;
        private DataRow dataRow;
        private DataTable dataTable = new DataTable();
        public OrderForm()
        {
            InitializeComponent();
        }


        private void ShowMenu()
        {
            List<Product> menuItems = GetMenuItems();

            dgvMenu.Columns.Clear();
            dgvMenu.Rows.Clear();


            dgvMenu.Columns.Add("ProductId", "ID");
            dgvMenu.Columns.Add("Name", "Name");
            dgvMenu.Columns.Add("Price", "Price");
            dgvMenu.Columns.Add("Category", "Category");
            dgvMenu.Columns.Add("Description", "Description");
            dgvMenu.Columns["ProductId"].Width = 50;
            dgvMenu.Columns["Name"].Width = 100;
            dgvMenu.Columns["Price"].Width = 100;
            dgvMenu.Columns["Category"].Width = 100;
            dgvMenu.Columns["Description"].Width = 100;

            DataGridViewImageColumn imageColumn = new DataGridViewImageColumn();
            imageColumn.HeaderText = "Image";
            imageColumn.ImageLayout = DataGridViewImageCellLayout.Zoom;
            imageColumn.Width = 200;
            dgvMenu.Columns.Add(imageColumn);

            foreach (Product product in menuItems)
            {
                string categoryName = GetCategoryNameById(product.CategoryId);

                Image image = LoadImageFromURL(product.ImageUrl);
                if (image != null)
                {
                    image = new Bitmap(image, 200, 200);
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

        private void OrderForm_Load(object sender, EventArgs e)
        {
            dgvMenu.RowTemplate.Height = 100;
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
                txtName.Text = row.Cells[1].FormattedValue.ToString();
                txtPrice.Text = row.Cells[2].FormattedValue.ToString();
            }
        }


        


        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (dgvOrderList.RowCount == 0)
            {
                DataColumn nameColumn = new DataColumn("name", typeof(string));
                DataColumn priceColumn = new DataColumn("price", typeof(decimal));
                DataColumn quantityColumn = new DataColumn("quantity", typeof(int));



                dataTable.Columns.Add(nameColumn);
                dataTable.Columns.Add(priceColumn);
                dataTable.Columns.Add(quantityColumn);

                string name = txtName.Text;
                decimal price = decimal.Parse(txtPrice.Text);
                int quantity = (int)nuQuantity.Value;


                DataRow newRow = dataTable.NewRow();

                newRow["name"] = name;
                newRow["price"] = price;
                newRow["quantity"] = quantity;


                dataTable.Rows.Add(newRow);
            }
            else if (dgvOrderList.Rows.Count > 0)
            {
                string name = txtName.Text;
                decimal price = decimal.Parse(txtPrice.Text);
                int quantity = (int)nuQuantity.Value;


                DataRow newRow = dataTable.NewRow();

                newRow["name"] = name;
                newRow["price"] = price;
                newRow["quantity"] = quantity;


                dataTable.Rows.Add(newRow);
            }




            txtName.Text = "";

            txtPrice.Text = "";
            nuQuantity.Value = 0;
            dgvOrderList.DataSource = dataTable;
            MessageBox.Show("Data added successfully");
        }

        private void dgvOrderList_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0 && e.ColumnIndex >= 0)
            {

                DataGridViewRow selectedRow = dgvOrderList.Rows[e.RowIndex];






                RecalculateTotalAmount();
            }
        }


        private void RecalculateTotalAmount()
        {
            decimal totalAmount = 0;


            foreach (DataGridViewRow row in dgvOrderList.Rows)
            {
                decimal price = Convert.ToDecimal(row.Cells["price"].Value);
                int quantity = Convert.ToInt32(row.Cells["quantity"].Value);
                decimal productAmount = price * quantity;
                totalAmount += productAmount;
            }


            txtThanhtien.Text = totalAmount.ToString();
        }

        private void btnDone_Click(object sender, EventArgs e)
        {
            RecalculateTotalAmount();
        }

        private void button1_Click(object sender, EventArgs e) => Close();

    }
}
