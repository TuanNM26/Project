namespace CafeManageMentFormApp
{
    partial class InventoryForm
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
            dgvInventoryList = new DataGridView();
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            label4 = new Label();
            label5 = new Label();
            label6 = new Label();
            txtID = new TextBox();
            txtName = new TextBox();
            txtPrice = new TextBox();
            nuQuantity = new NumericUpDown();
            btnAdd = new Button();
            btnDelete = new Button();
            btnUpdate = new Button();
            btnClose = new Button();
            ((System.ComponentModel.ISupportInitialize)dgvInventoryList).BeginInit();
            ((System.ComponentModel.ISupportInitialize)nuQuantity).BeginInit();
            SuspendLayout();
            // 
            // dgvInventoryList
            // 
            dgvInventoryList.BackgroundColor = SystemColors.Info;
            dgvInventoryList.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvInventoryList.Location = new Point(12, 87);
            dgvInventoryList.Name = "dgvInventoryList";
            dgvInventoryList.RowHeadersWidth = 51;
            dgvInventoryList.RowTemplate.Height = 29;
            dgvInventoryList.Size = new Size(655, 508);
            dgvInventoryList.TabIndex = 0;
            dgvInventoryList.CellContentClick += dgvInventoryList_CellContentClick;
            // 
            // label1
            // 
            label1.BackColor = SystemColors.ActiveCaption;
            label1.Font = new Font("Segoe UI", 30F, FontStyle.Regular, GraphicsUnit.Point);
            label1.ForeColor = SystemColors.Desktop;
            label1.Location = new Point(12, 9);
            label1.Name = "label1";
            label1.Size = new Size(1098, 75);
            label1.TabIndex = 1;
            label1.Text = "Inventory Manage";
            label1.TextAlign = ContentAlignment.TopCenter;
            // 
            // label2
            // 
            label2.BackColor = SystemColors.Info;
            label2.Font = new Font("Segoe UI", 15F, FontStyle.Regular, GraphicsUnit.Point);
            label2.Location = new Point(673, 87);
            label2.Name = "label2";
            label2.Size = new Size(437, 47);
            label2.TabIndex = 2;
            label2.Text = "Inventory Manage Action";
            label2.TextAlign = ContentAlignment.TopCenter;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(736, 184);
            label3.Name = "label3";
            label3.Size = new Size(27, 20);
            label3.TabIndex = 3;
            label3.Text = "ID:";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(713, 251);
            label4.Name = "label4";
            label4.Size = new Size(52, 20);
            label4.TabIndex = 4;
            label4.Text = "Name:";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Location = new Point(700, 318);
            label5.Name = "label5";
            label5.Size = new Size(68, 20);
            label5.TabIndex = 5;
            label5.Text = "Quantity:";
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Location = new Point(696, 389);
            label6.Name = "label6";
            label6.Size = new Size(75, 20);
            label6.TabIndex = 6;
            label6.Text = "Unit Price:";
            // 
            // txtID
            // 
            txtID.Location = new Point(802, 181);
            txtID.Name = "txtID";
            txtID.ReadOnly = true;
            txtID.Size = new Size(244, 27);
            txtID.TabIndex = 7;
            // 
            // txtName
            // 
            txtName.Location = new Point(802, 248);
            txtName.Name = "txtName";
            txtName.Size = new Size(244, 27);
            txtName.TabIndex = 8;
            // 
            // txtPrice
            // 
            txtPrice.Location = new Point(802, 386);
            txtPrice.Name = "txtPrice";
            txtPrice.Size = new Size(244, 27);
            txtPrice.TabIndex = 10;
            // 
            // nuQuantity
            // 
            nuQuantity.Location = new Point(802, 316);
            nuQuantity.Name = "nuQuantity";
            nuQuantity.Size = new Size(244, 27);
            nuQuantity.TabIndex = 11;
            // 
            // btnAdd
            // 
            btnAdd.Location = new Point(726, 481);
            btnAdd.Name = "btnAdd";
            btnAdd.Size = new Size(94, 29);
            btnAdd.TabIndex = 12;
            btnAdd.Text = "Add ";
            btnAdd.UseVisualStyleBackColor = true;
            btnAdd.Click += btnAdd_Click;
            // 
            // btnDelete
            // 
            btnDelete.Location = new Point(976, 481);
            btnDelete.Name = "btnDelete";
            btnDelete.Size = new Size(94, 29);
            btnDelete.TabIndex = 12;
            btnDelete.Text = "Delete";
            btnDelete.UseVisualStyleBackColor = true;
            btnDelete.Click += btnDelete_Click;
            // 
            // btnUpdate
            // 
            btnUpdate.Location = new Point(855, 481);
            btnUpdate.Name = "btnUpdate";
            btnUpdate.Size = new Size(94, 29);
            btnUpdate.TabIndex = 13;
            btnUpdate.Text = "Update";
            btnUpdate.UseVisualStyleBackColor = true;
            btnUpdate.Click += btnUpdate_Click;
            // 
            // btnClose
            // 
            btnClose.Location = new Point(855, 532);
            btnClose.Name = "btnClose";
            btnClose.Size = new Size(94, 29);
            btnClose.TabIndex = 14;
            btnClose.Text = "Close";
            btnClose.UseVisualStyleBackColor = true;
            btnClose.Click += btnClose_Click;
            // 
            // InventoryForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.ActiveCaption;
            ClientSize = new Size(1122, 607);
            Controls.Add(btnClose);
            Controls.Add(btnUpdate);
            Controls.Add(btnDelete);
            Controls.Add(btnAdd);
            Controls.Add(nuQuantity);
            Controls.Add(txtPrice);
            Controls.Add(txtName);
            Controls.Add(txtID);
            Controls.Add(label6);
            Controls.Add(label5);
            Controls.Add(label4);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(dgvInventoryList);
            ForeColor = SystemColors.InactiveCaptionText;
            Name = "InventoryForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "InventoryForm";
            Load += InventoryForm_Load;
            ((System.ComponentModel.ISupportInitialize)dgvInventoryList).EndInit();
            ((System.ComponentModel.ISupportInitialize)nuQuantity).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView dgvInventoryList;
        private Label label1;
        private Label label2;
        private Label label3;
        private Label label4;
        private Label label5;
        private Label label6;
        private TextBox txtID;
        private TextBox txtName;
        private TextBox txtPrice;
        private NumericUpDown nuQuantity;
        private Button btnAdd;
        private Button btnDelete;
        private Button btnUpdate;
        private Button btnClose;
    }
}