using CafeManageMentFormApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CafeManageMentFormApp
{
    public partial class InventoryForm : Form
    {

        public CafeManagementContext Context = new CafeManagementContext();

        private InventoryItem selectedProduct;
        public InventoryForm()
        {
            InitializeComponent();
        }

        private void InventoryForm_Load(object sender, EventArgs e)
        {
            ShowInventoryItems();
        }

        private void ShowInventoryItems()
        {
            List<InventoryItem> inventoryItems = GetInventoryItems();

            dgvInventoryList.Columns.Clear();
            dgvInventoryList.Rows.Clear();


            dgvInventoryList.Columns.Add("InventoryItemId", "ID");
            dgvInventoryList.Columns.Add("Name", "Name");
            dgvInventoryList.Columns.Add("Quantity", "Quantity");
            dgvInventoryList.Columns.Add("UnitPrice", "Unit Price");
            dgvInventoryList.Columns["InventoryItemId"].Width = 100;
            dgvInventoryList.Columns["Name"].Width = 150;
            dgvInventoryList.Columns["Quantity"].Width = 150;
            dgvInventoryList.Columns["UnitPrice"].Width = 200;

            foreach (InventoryItem item in inventoryItems)
            {
                dgvInventoryList.Rows.Add(item.InventoryItemId, item.Name, item.Quantity, item.UnitPrice.ToString());
            }
        }

        private List<InventoryItem> GetInventoryItems()
        {

            List<InventoryItem> inventoryItems = Context.InventoryItems.ToList();
            return inventoryItems;
        }

        private void dgvInventoryList_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            int selectedRow = e.RowIndex;
            int ItemID = Convert.ToInt32(dgvInventoryList.Rows[selectedRow].Cells["InventoryItemId"].Value);
            selectedProduct = Context.InventoryItems.FirstOrDefault(x => x.InventoryItemId == ItemID);

            if (e.RowIndex >= 0)
            {
                DataGridViewRow row = dgvInventoryList.Rows[e.RowIndex];
                txtID.Text = row.Cells[0].FormattedValue.ToString();
                txtName.Text = row.Cells[1].FormattedValue.ToString();
                nuQuantity.Text = row.Cells[2].FormattedValue.ToString();
                txtPrice.Text = row.Cells[3].FormattedValue.ToString();



            }
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            int ItemId = int.Parse(txtID.Text);
            string productName = txtName.Text;
            int quantity = (int)nuQuantity.Value;
            decimal unitprice = decimal.Parse(txtPrice.Text);



            using (var newContext = new CafeManagementContext())
            {

                InventoryItem newProduct = new InventoryItem
                {
                    Name = productName,
                    Quantity = quantity,
                    UnitPrice = unitprice,

                };


                newContext.InventoryItems.Add(newProduct);


                newContext.SaveChanges();


                ShowInventoryItems();

                MessageBox.Show("Product added successfully!");

                ClearFields();


            }
        }
        private void ClearFields()
        {
            txtID.Text = "";
            txtName.Text = "";
            txtPrice.Text = "";

            nuQuantity.Value = 0;

        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (selectedProduct != null)
            {

                selectedProduct.Name = txtName.Text;
                selectedProduct.UnitPrice = decimal.Parse(txtPrice.Text);
                selectedProduct.Quantity = (int)nuQuantity.Value;


                Context.SaveChanges();
                MessageBox.Show("Update thành công");
                ShowInventoryItems();
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

                Context.InventoryItems.Remove(selectedProduct);
                Context.SaveChanges();
                MessageBox.Show("Delete thành công");
                ShowInventoryItems();

            }
            else
            {
                MessageBox.Show("Vui lòng chọn nhân viên cần xóa.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void btnClose_Click(object sender, EventArgs e) => Close();

    }
}
