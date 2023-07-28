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
    public partial class EmployeeForm : Form
    {
        public CafeManagementContext context = new CafeManagementContext();
        public EmployeeForm()
        {
            InitializeComponent();
        }

        private Employee selectedEmployee;
        private void EmployeeForm_Load(object sender, EventArgs e)
        {


            var distinctPositions = context.Employees.Select(e => e.Position).Distinct().ToList();


            cboPosition.DataSource = distinctPositions;
            ShowEmployee();
        }

        private void ShowEmployee()
        {
            List<Employee> employees = GetEmployees();

            dgvEmployee.Columns.Clear();
            dgvEmployee.Rows.Clear();


            dgvEmployee.Columns.Add("EmployeeId", "ID");
            dgvEmployee.Columns.Add("Name", "Name");
            dgvEmployee.Columns.Add("Position", "Position");
            dgvEmployee.Columns.Add("Salary", "Salary");
            dgvEmployee.Columns["EmployeeId"].Width = 100;
            dgvEmployee.Columns["Name"].Width = 100;
            dgvEmployee.Columns["Position"].Width = 100;
            dgvEmployee.Columns["Salary"].Width = 150;

            foreach (Employee employee in employees)
            {
                dgvEmployee.Rows.Add(employee.EmployeeId, employee.Name, employee.Position, employee.Salary.ToString());
            }
        }


        private List<Employee> GetEmployees()
        {

            List<Employee> employees = context.Employees.ToList();
            return employees;
        }

        private void dgvEmployee_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            int selectedRow = e.RowIndex;
            int EmpID = Convert.ToInt32(dgvEmployee.Rows[selectedRow].Cells["EmployeeId"].Value);
            selectedEmployee = context.Employees.FirstOrDefault(x => x.EmployeeId == EmpID);

            if (e.RowIndex >= 0)
            {
                DataGridViewRow row = dgvEmployee.Rows[e.RowIndex];
                txtID.Text = row.Cells[0].FormattedValue.ToString();
                txtName.Text = row.Cells[1].FormattedValue.ToString();
                cboPosition.Text = row.Cells[2].FormattedValue.ToString();
                txtSalary.Text = row.Cells[3].FormattedValue.ToString();



            }
        }

        private void ClearFields()
        {
            txtID.Text = "";
            txtName.Text = "";
            cboPosition.SelectedIndex = 0;

            txtSalary.Text = "";

        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            string employeeName = txtName.Text;
            string position = cboPosition.Text;
            decimal salary = decimal.Parse(txtSalary.Text);



            Employee newEmployee = new Employee
            {
                Name = employeeName,
                Position = position,
                Salary = salary
            };


            context.Employees.Add(newEmployee);


            context.SaveChanges();


            ShowEmployee();

            MessageBox.Show("Employee added successfully!");

            ClearFields();

        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (selectedEmployee != null)
            {

                selectedEmployee.Name = txtName.Text;
                selectedEmployee.Position = cboPosition.SelectedValue.ToString();
                selectedEmployee.Salary = decimal.Parse(txtSalary.Text);


                context.SaveChanges();
                MessageBox.Show("Update thành công");
                ShowEmployee();
                ClearFields();


            }
            else
            {
                MessageBox.Show("Vui lòng chọn nhân viên cần cập nhật.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (selectedEmployee != null)
            {
                // Xóa nhân viên
                context.Employees.Remove(selectedEmployee);
                context.SaveChanges();
                MessageBox.Show("Delete thành công");
                ShowEmployee();

            }
            else
            {
                MessageBox.Show("Vui lòng chọn nhân viên cần xóa.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void btnClose_Click(object sender, EventArgs e) => Close();

    }
}
