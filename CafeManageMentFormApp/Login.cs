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
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();
        }

        public CafeManagementContext Context = new CafeManagementContext();
        private void btnLogin_Click(object sender, EventArgs e)
        {
            string username = txtName.Text;


            string position = GetPositionByUsername(username);

            if (position != null)
            {
                MessageBox.Show(position);

                Form1 mainForm = new Form1();
                mainForm.CurrentUserPosition = position;
                mainForm.ShowDialog();


                this.Close();

            }
            else
            {
                MessageBox.Show("sai tên hoặc chưa nhập xin mời kiểm tra lại");
            }
        }



        public string GetPositionByUsername(string username)
        {


            var employee = Context.Employees.FirstOrDefault(e => e.Name == username);

            if (employee != null)
            {

                return employee.Position;
            }


            return null;

        }
    }
}
