namespace CafeManageMentFormApp
{
    partial class EmployeeForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            label1 = new Label();
            dgvEmployee = new DataGridView();
            label2 = new Label();
            txtID = new TextBox();
            txtName = new TextBox();
            txtSalary = new TextBox();
            btnAdd = new Button();
            label3 = new Label();
            label4 = new Label();
            label5 = new Label();
            label6 = new Label();
            cboPosition = new ComboBox();
            btnUpdate = new Button();
            btnDelete = new Button();
            btnClose = new Button();
            ((System.ComponentModel.ISupportInitialize)dgvEmployee).BeginInit();
            SuspendLayout();
            // 
            // label1
            // 
            label1.BackColor = SystemColors.ActiveCaption;
            label1.Font = new Font("Segoe UI", 18F, FontStyle.Regular, GraphicsUnit.Point);
            label1.Location = new Point(12, 9);
            label1.Name = "label1";
            label1.Size = new Size(899, 46);
            label1.TabIndex = 0;
            label1.Text = "Employee Manage";
            label1.TextAlign = ContentAlignment.TopCenter;
            // 
            // dgvEmployee
            // 
            dgvEmployee.BackgroundColor = SystemColors.Info;
            dgvEmployee.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvEmployee.Location = new Point(12, 58);
            dgvEmployee.Name = "dgvEmployee";
            dgvEmployee.RowHeadersWidth = 51;
            dgvEmployee.RowTemplate.Height = 29;
            dgvEmployee.Size = new Size(480, 429);
            dgvEmployee.TabIndex = 1;
            dgvEmployee.CellContentClick += dgvEmployee_CellContentClick;
            // 
            // label2
            // 
            label2.BackColor = SystemColors.Info;
            label2.Font = new Font("Segoe UI", 18F, FontStyle.Regular, GraphicsUnit.Point);
            label2.Location = new Point(498, 58);
            label2.Name = "label2";
            label2.Size = new Size(413, 46);
            label2.TabIndex = 2;
            label2.Text = "Action";
            label2.TextAlign = ContentAlignment.TopCenter;
            // 
            // txtID
            // 
            txtID.Location = new Point(641, 126);
            txtID.Name = "txtID";
            txtID.ReadOnly = true;
            txtID.Size = new Size(245, 27);
            txtID.TabIndex = 3;
            // 
            // txtName
            // 
            txtName.Location = new Point(641, 190);
            txtName.Name = "txtName";
            txtName.Size = new Size(245, 27);
            txtName.TabIndex = 5;
            // 
            // txtSalary
            // 
            txtSalary.Location = new Point(689, 308);
            txtSalary.Name = "txtSalary";
            txtSalary.Size = new Size(151, 27);
            txtSalary.TabIndex = 9;
            // 
            // btnAdd
            // 
            btnAdd.Location = new Point(534, 396);
            btnAdd.Name = "btnAdd";
            btnAdd.Size = new Size(94, 29);
            btnAdd.TabIndex = 10;
            btnAdd.Text = "Add";
            btnAdd.UseVisualStyleBackColor = true;
            btnAdd.Click += btnAdd_Click;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(534, 126);
            label3.Name = "label3";
            label3.Size = new Size(94, 20);
            label3.TabIndex = 11;
            label3.Text = "Employee ID";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(509, 193);
            label4.Name = "label4";
            label4.Size = new Size(119, 20);
            label4.TabIndex = 12;
            label4.Text = "Employee Name";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(567, 247);
            label5.Name = "label5";
            label5.Size = new Size(61, 20);
            label5.TabIndex = 13;
            label5.Text = "Position";
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(567, 315);
            label6.Name = "label6";
            label6.Size = new Size(49, 20);
            label6.TabIndex = 14;
            label6.Text = "Salary";
            // 
            // cboPosition
            // 
            cboPosition.FormattingEnabled = true;
            cboPosition.Location = new Point(689, 247);
            cboPosition.Name = "cboPosition";
            cboPosition.Size = new Size(151, 28);
            cboPosition.TabIndex = 15;
            // 
            // btnUpdate
            // 
            btnUpdate.Location = new Point(666, 396);
            btnUpdate.Name = "btnUpdate";
            btnUpdate.Size = new Size(94, 29);
            btnUpdate.TabIndex = 16;
            btnUpdate.Text = "Update";
            btnUpdate.UseVisualStyleBackColor = true;
            btnUpdate.Click += btnUpdate_Click;
            // 
            // btnDelete
            // 
            btnDelete.Location = new Point(792, 396);
            btnDelete.Name = "btnDelete";
            btnDelete.Size = new Size(94, 29);
            btnDelete.TabIndex = 17;
            btnDelete.Text = "Delete";
            btnDelete.UseVisualStyleBackColor = true;
            btnDelete.Click += btnDelete_Click;
            // 
            // btnClose
            // 
            btnClose.Location = new Point(666, 449);
            btnClose.Name = "btnClose";
            btnClose.Size = new Size(94, 29);
            btnClose.TabIndex = 18;
            btnClose.Text = "Close";
            btnClose.UseVisualStyleBackColor = true;
            btnClose.Click += btnClose_Click;
            // 
            // EmployeeForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(918, 495);
            Controls.Add(btnClose);
            Controls.Add(btnDelete);
            Controls.Add(btnUpdate);
            Controls.Add(cboPosition);
            Controls.Add(label6);
            Controls.Add(label5);
            Controls.Add(label4);
            Controls.Add(label3);
            Controls.Add(btnAdd);
            Controls.Add(txtSalary);
            Controls.Add(txtName);
            Controls.Add(txtID);
            Controls.Add(label2);
            Controls.Add(dgvEmployee);
            Controls.Add(label1);
            Name = "EmployeeForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "EmployeeForm";
            Load += EmployeeForm_Load;
            ((System.ComponentModel.ISupportInitialize)dgvEmployee).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private DataGridView dgvEmployee;
        private Label label2;
        private TextBox txtID;
        private TextBox txtName;
        private TextBox txtSalary;
        private Button btnAdd;
        private Label label3;
        private Label label4;
        private Label label5;
        private Label label6;
        private ComboBox cboPosition;
        private Button btnUpdate;
        private Button btnDelete;
        private Button btnClose;
    }
}