namespace CafeManageMentFormApp
{
    partial class MenuForm
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
            dgvMenu = new DataGridView();
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            label4 = new Label();
            label5 = new Label();
            label6 = new Label();
            txtSearch = new TextBox();
            txtName = new TextBox();
            txtPrice = new TextBox();
            cboCategory = new ComboBox();
            txtDesciption = new TextBox();
            btnAdd = new Button();
            btnDelete = new Button();
            btnUpdate = new Button();
            label7 = new Label();
            sqlCommand1 = new Microsoft.Data.SqlClient.SqlCommand();
            txtURL = new TextBox();
            label8 = new Label();
            btnClose = new Button();
            label9 = new Label();
            txtID = new TextBox();
            button1 = new Button();
            ((System.ComponentModel.ISupportInitialize)dgvMenu).BeginInit();
            SuspendLayout();
            // 
            // dgvMenu
            // 
            dgvMenu.BackgroundColor = SystemColors.Info;
            dgvMenu.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvMenu.Location = new Point(12, 77);
            dgvMenu.Name = "dgvMenu";
            dgvMenu.RowHeadersWidth = 51;
            dgvMenu.RowTemplate.Height = 29;
            dgvMenu.Size = new Size(1307, 670);
            dgvMenu.TabIndex = 0;
            dgvMenu.CellContentClick += dgvMenu_CellContentClick;
            // 
            // label1
            // 
            label1.BackColor = SystemColors.ActiveCaption;
            label1.Font = new Font("Segoe UI", 28.2F, FontStyle.Regular, GraphicsUnit.Point);
            label1.Location = new Point(12, 5);
            label1.Name = "label1";
            label1.Size = new Size(1773, 69);
            label1.TabIndex = 1;
            label1.Text = "Menu Manage";
            label1.TextAlign = ContentAlignment.TopCenter;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(1364, 150);
            label2.Name = "label2";
            label2.Size = new Size(56, 20);
            label2.TabIndex = 2;
            label2.Text = "Search:";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(1341, 261);
            label3.Name = "label3";
            label3.Size = new Size(111, 20);
            label3.TabIndex = 3;
            label3.Text = "Product Name: ";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(1392, 321);
            label4.Name = "label4";
            label4.Size = new Size(44, 20);
            label4.TabIndex = 4;
            label4.Text = "Price:";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(1364, 383);
            label5.Name = "label5";
            label5.Size = new Size(72, 20);
            label5.TabIndex = 5;
            label5.Text = "Category:";
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(1348, 463);
            label6.Name = "label6";
            label6.Size = new Size(88, 20);
            label6.TabIndex = 6;
            label6.Text = "Description:";
            // 
            // txtSearch
            // 
            txtSearch.Location = new Point(1460, 150);
            txtSearch.Name = "txtSearch";
            txtSearch.Size = new Size(306, 27);
            txtSearch.TabIndex = 7;
            txtSearch.TextChanged += txtSearch_TextChanged;
            // 
            // txtName
            // 
            txtName.Location = new Point(1460, 258);
            txtName.Name = "txtName";
            txtName.Size = new Size(306, 27);
            txtName.TabIndex = 8;
            // 
            // txtPrice
            // 
            txtPrice.Location = new Point(1460, 318);
            txtPrice.Name = "txtPrice";
            txtPrice.Size = new Size(306, 27);
            txtPrice.TabIndex = 9;
            // 
            // cboCategory
            // 
            cboCategory.FormattingEnabled = true;
            cboCategory.Location = new Point(1460, 383);
            cboCategory.Name = "cboCategory";
            cboCategory.Size = new Size(306, 28);
            cboCategory.TabIndex = 10;
            // 
            // txtDesciption
            // 
            txtDesciption.Location = new Point(1460, 460);
            txtDesciption.Multiline = true;
            txtDesciption.Name = "txtDesciption";
            txtDesciption.Size = new Size(306, 73);
            txtDesciption.TabIndex = 11;
            // 
            // btnAdd
            // 
            btnAdd.Location = new Point(1370, 619);
            btnAdd.Name = "btnAdd";
            btnAdd.Size = new Size(94, 29);
            btnAdd.TabIndex = 12;
            btnAdd.Text = "Add";
            btnAdd.UseVisualStyleBackColor = true;
            btnAdd.Click += btnAdd_Click;
            // 
            // btnDelete
            // 
            btnDelete.Location = new Point(1672, 619);
            btnDelete.Name = "btnDelete";
            btnDelete.Size = new Size(94, 29);
            btnDelete.TabIndex = 14;
            btnDelete.Text = "Delete";
            btnDelete.UseVisualStyleBackColor = true;
            btnDelete.Click += btnDelete_Click;
            // 
            // btnUpdate
            // 
            btnUpdate.Location = new Point(1524, 619);
            btnUpdate.Name = "btnUpdate";
            btnUpdate.Size = new Size(94, 29);
            btnUpdate.TabIndex = 15;
            btnUpdate.Text = "Update";
            btnUpdate.UseVisualStyleBackColor = true;
            btnUpdate.Click += btnUpdate_Click;
            // 
            // label7
            // 
            label7.AutoSize = true;
            label7.Location = new Point(1342, 563);
            label7.Name = "label7";
            label7.Size = new Size(84, 20);
            label7.TabIndex = 16;
            label7.Text = "Image URL:";
            // 
            // sqlCommand1
            // 
            sqlCommand1.CommandTimeout = 30;
            sqlCommand1.EnableOptimizedParameterBinding = false;
            // 
            // txtURL
            // 
            txtURL.Location = new Point(1460, 560);
            txtURL.Name = "txtURL";
            txtURL.Size = new Size(306, 27);
            txtURL.TabIndex = 17;
            // 
            // label8
            // 
            label8.BackColor = SystemColors.Info;
            label8.Font = new Font("Segoe UI", 16.2F, FontStyle.Regular, GraphicsUnit.Point);
            label8.Location = new Point(1332, 90);
            label8.Name = "label8";
            label8.Size = new Size(434, 44);
            label8.TabIndex = 18;
            label8.Text = "Action";
            label8.TextAlign = ContentAlignment.TopCenter;
            // 
            // btnClose
            // 
            btnClose.Location = new Point(1575, 684);
            btnClose.Name = "btnClose";
            btnClose.Size = new Size(137, 35);
            btnClose.TabIndex = 19;
            btnClose.Text = "Close";
            btnClose.UseVisualStyleBackColor = true;
            btnClose.Click += btnClose_Click;
            // 
            // label9
            // 
            label9.AutoSize = true;
            label9.Location = new Point(1364, 210);
            label9.Name = "label9";
            label9.Size = new Size(73, 20);
            label9.TabIndex = 20;
            label9.Text = "ProductId";
            // 
            // txtID
            // 
            txtID.Location = new Point(1460, 203);
            txtID.Name = "txtID";
            txtID.ReadOnly = true;
            txtID.Size = new Size(306, 27);
            txtID.TabIndex = 21;
            // 
            // button1
            // 
            button1.Location = new Point(1412, 684);
            button1.Name = "button1";
            button1.Size = new Size(137, 35);
            button1.TabIndex = 19;
            button1.Text = "Refresh";
            button1.UseVisualStyleBackColor = true;
            button1.Click += btnRefresh_Click;
            // 
            // MenuForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1781, 754);
            Controls.Add(txtID);
            Controls.Add(label9);
            Controls.Add(button1);
            Controls.Add(btnClose);
            Controls.Add(label8);
            Controls.Add(txtURL);
            Controls.Add(label7);
            Controls.Add(btnUpdate);
            Controls.Add(btnDelete);
            Controls.Add(btnAdd);
            Controls.Add(txtDesciption);
            Controls.Add(cboCategory);
            Controls.Add(txtPrice);
            Controls.Add(txtName);
            Controls.Add(txtSearch);
            Controls.Add(label6);
            Controls.Add(label5);
            Controls.Add(label4);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(dgvMenu);
            Name = "MenuForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "MenuForm";
            Load += MenuForm_Load;
            ((System.ComponentModel.ISupportInitialize)dgvMenu).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView dgvMenu;
        private Label label1;
        private Label label2;
        private Label label3;
        private Label label4;
        private Label label5;
        private Label label6;
        private TextBox txtSearch;
        private TextBox txtName;
        private TextBox txtPrice;
        private ComboBox cboCategory;
        private TextBox txtDesciption;
        private Button btnAdd;
        private Button btnDelete;
        private Button btnUpdate;
        private Label label7;
        private Microsoft.Data.SqlClient.SqlCommand sqlCommand1;
        private TextBox txtURL;
        private Label label8;
        private Button btnClose;
        private Label label9;
        private TextBox txtID;
        private Button button1;
    }
}