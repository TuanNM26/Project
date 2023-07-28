using System.Data;
using System.Net;
using CafeManageMentFormApp.Models;
using Microsoft.EntityFrameworkCore;

namespace CafeManageMentFormApp
{
    public partial class Form1 : Form
    {


        public CafeManagementContext Context = new CafeManagementContext();

        public string CurrentUserPosition { get; set; }
        public Form1()
        {
            InitializeComponent();

        }


        private void btnMenu_Click(object sender, EventArgs e)
        {
            MenuForm menuForm = new MenuForm();
            menuForm.ProductAdded += MenuForm_ProductAdded;
            menuForm.ProductUpdated += MenuForm_ProductUpdated;
            menuForm.ProductDeleted += MenuForm_ProductDeleted;
            menuForm.ShowDialog();
        }

        private void MenuForm_ProductAdded(object sender, ProductAddedEventArgs e)
        {

            ShowMenu();
        }

        private void MenuForm_ProductUpdated(object sender, ProductUpdatedEventArgs e)
        {

            Product updatedProduct = e.UpdatedProduct;

            // Tìm sản phẩm trong DataGridView của Form1 dựa trên ProductId và cập nhật thông tin
            foreach (DataGridViewRow row in dgvMenu.Rows)
            {
                int productId = Convert.ToInt32(row.Cells["ProductId"].Value);
                if (productId == updatedProduct.ProductId)
                {
                    row.Cells["Name"].Value = updatedProduct.Name;
                    row.Cells["Price"].Value = updatedProduct.Price.ToString();
                    row.Cells["Category"].Value = GetCategoryNameById(updatedProduct.CategoryId);
                    row.Cells["Description"].Value = updatedProduct.Description;
                    // Cập nhật thông tin hình ảnh nếu cần
                    // ...

                    break;
                }


                ShowMenu();


            }
        }
        private void MenuForm_ProductDeleted(object sender, ProductDeletedEventArgs e)
        {

            ShowMenu();
        }
        private void btnOrder_Click(object sender, EventArgs e)
        {
            OrderForm orderForm = new OrderForm();
            orderForm.ShowDialog();
        }

        private void btnInventory_Click(object sender, EventArgs e)
        {
            InventoryForm inventoryForm = new InventoryForm();
            inventoryForm.ShowDialog();

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








        private void Form1_Load(object sender, EventArgs e)
        {

            dgvMenu.RowTemplate.Height = 200;
            timer1.Start();


            lblCurrentDate.Text = DateTime.Now.ToString("dd/MM/yyyy");

            btnMenu.Enabled = false;
            btnInventory.Enabled = false;
            btnEmployee.Enabled = false;

            if (CurrentUserPosition == "Quản lí")
            {
                btnMenu.Enabled = true;
                btnInventory.Enabled = true;
                btnEmployee.Enabled = true;
            }
            else if (CurrentUserPosition == "Nhân viên")
            {
                btnOrder.Enabled = true;
            }


            ShowMenu();


        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            // Cập nhật ngày hiện tại mỗi giây
            lblCurrentDate.Text = DateTime.Now.ToString("dd/MM/yyyy");
        }

        private void btnRefresh_Click(object sender, EventArgs e)
        {

            ShowMenu();
        }

        private void btnEmployee_Click(object sender, EventArgs e)
        {
            EmployeeForm employeeForm = new EmployeeForm();
            employeeForm.ShowDialog();
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {


            this.Close();


            Application.Exit();


            Application.Restart();
        }


    }
}