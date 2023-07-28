namespace CafeManageMentFormApp
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            btnMenu = new Button();
            btnOrder = new Button();
            btnInventory = new Button();
            label1 = new Label();
            dgvMenu = new DataGridView();
            btnRefresh = new Button();
            timer1 = new System.Windows.Forms.Timer(components);
            lbTime = new Label();
            lblCurrentDate = new Label();
            btnEmployee = new Button();
            btnLogout = new Button();
            ((System.ComponentModel.ISupportInitialize)dgvMenu).BeginInit();
            SuspendLayout();
            // 
            // btnMenu
            // 
            btnMenu.Location = new Point(96, 85);
            btnMenu.Name = "btnMenu";
            btnMenu.Size = new Size(254, 52);
            btnMenu.TabIndex = 1;
            btnMenu.Text = "Menu Manage";
            btnMenu.UseVisualStyleBackColor = true;
            btnMenu.Click += btnMenu_Click;
            // 
            // btnOrder
            // 
            btnOrder.Location = new Point(433, 85);
            btnOrder.Name = "btnOrder";
            btnOrder.Size = new Size(268, 52);
            btnOrder.TabIndex = 2;
            btnOrder.Text = "Order Manage";
            btnOrder.UseVisualStyleBackColor = true;
            btnOrder.Click += btnOrder_Click;
            // 
            // btnInventory
            // 
            btnInventory.Location = new Point(780, 85);
            btnInventory.Name = "btnInventory";
            btnInventory.Size = new Size(278, 52);
            btnInventory.TabIndex = 3;
            btnInventory.Text = "Inventory Manage";
            btnInventory.UseVisualStyleBackColor = true;
            btnInventory.Click += btnInventory_Click;
            // 
            // label1
            // 
            label1.BackColor = SystemColors.ActiveCaption;
            label1.Font = new Font("Segoe UI", 25.8000011F, FontStyle.Regular, GraphicsUnit.Point);
            label1.Location = new Point(12, 9);
            label1.Name = "label1";
            label1.Size = new Size(1444, 61);
            label1.TabIndex = 4;
            label1.Text = "Cafe Management System";
            label1.TextAlign = ContentAlignment.TopCenter;
            // 
            // dgvMenu
            // 
            dgvMenu.BackgroundColor = SystemColors.Info;
            dgvMenu.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvMenu.Location = new Point(2, 143);
            dgvMenu.Name = "dgvMenu";
            dgvMenu.RowHeadersWidth = 51;
            dgvMenu.RowTemplate.Height = 29;
            dgvMenu.Size = new Size(1444, 609);
            dgvMenu.TabIndex = 5;
            // 
            // btnRefresh
            // 
            btnRefresh.Location = new Point(148, 18);
            btnRefresh.Name = "btnRefresh";
            btnRefresh.Size = new Size(147, 52);
            btnRefresh.TabIndex = 6;
            btnRefresh.Text = "Refresh";
            btnRefresh.UseVisualStyleBackColor = true;
            btnRefresh.Click += btnRefresh_Click;
            // 
            // timer1
            // 
            timer1.Interval = 1000;
            timer1.Tick += timer1_Tick;
            // 
            // lbTime
            // 
            lbTime.AutoSize = true;
            lbTime.Location = new Point(1128, 20);
            lbTime.Name = "lbTime";
            lbTime.Size = new Size(0, 20);
            lbTime.TabIndex = 7;
            // 
            // lblCurrentDate
            // 
            lblCurrentDate.BackColor = SystemColors.ActiveCaption;
            lblCurrentDate.Font = new Font("Segoe UI", 16.2F, FontStyle.Regular, GraphicsUnit.Point);
            lblCurrentDate.Location = new Point(968, 26);
            lblCurrentDate.Name = "lblCurrentDate";
            lblCurrentDate.Size = new Size(366, 37);
            lblCurrentDate.TabIndex = 8;
            lblCurrentDate.Text = "label2";
            lblCurrentDate.TextAlign = ContentAlignment.TopCenter;
            // 
            // btnEmployee
            // 
            btnEmployee.Location = new Point(1118, 85);
            btnEmployee.Name = "btnEmployee";
            btnEmployee.Size = new Size(278, 52);
            btnEmployee.TabIndex = 9;
            btnEmployee.Text = "Employee Manage";
            btnEmployee.UseVisualStyleBackColor = true;
            btnEmployee.Click += btnEmployee_Click;
            // 
            // btnLogout
            // 
            btnLogout.Location = new Point(1299, 18);
            btnLogout.Name = "btnLogout";
            btnLogout.Size = new Size(147, 52);
            btnLogout.TabIndex = 10;
            btnLogout.Text = "Log out";
            btnLogout.UseVisualStyleBackColor = true;
            btnLogout.Click += btnLogout_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.ActiveCaption;
            ClientSize = new Size(1458, 764);
            Controls.Add(btnLogout);
            Controls.Add(btnEmployee);
            Controls.Add(lblCurrentDate);
            Controls.Add(lbTime);
            Controls.Add(btnRefresh);
            Controls.Add(dgvMenu);
            Controls.Add(label1);
            Controls.Add(btnInventory);
            Controls.Add(btnOrder);
            Controls.Add(btnMenu);
            Name = "Form1";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Form1";
            Load += Form1_Load;
            ((System.ComponentModel.ISupportInitialize)dgvMenu).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private Button btnMenu;
        private Button btnOrder;
        private Button btnInventory;
        private Label label1;
        private DataGridView dgvMenu;
        private Button btnRefresh;
        private System.Windows.Forms.Timer timer1;
        private Label lbTime;
        private Label lblCurrentDate;
        private Button btnEmployee;
        private Button btnLogout;
    }
}