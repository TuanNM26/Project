namespace CafeManageMentFormApp
{
    partial class OrderForm
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
            dgvOrderList = new DataGridView();
            label1 = new Label();
            label2 = new Label();
            label3 = new Label();
            label4 = new Label();
            btnAdd = new Button();
            btnDone = new Button();
            nuQuantity = new NumericUpDown();
            txtPrice = new TextBox();
            txtName = new TextBox();
            label5 = new Label();
            label6 = new Label();
            txtThanhtien = new TextBox();
            button1 = new Button();
            ((System.ComponentModel.ISupportInitialize)dgvMenu).BeginInit();
            ((System.ComponentModel.ISupportInitialize)dgvOrderList).BeginInit();
            ((System.ComponentModel.ISupportInitialize)nuQuantity).BeginInit();
            SuspendLayout();
            // 
            // dgvMenu
            // 
            dgvMenu.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvMenu.Location = new Point(12, 69);
            dgvMenu.Name = "dgvMenu";
            dgvMenu.RowHeadersWidth = 51;
            dgvMenu.RowTemplate.Height = 29;
            dgvMenu.Size = new Size(699, 539);
            dgvMenu.TabIndex = 0;
            dgvMenu.CellContentClick += dgvMenu_CellContentClick;
            // 
            // dgvOrderList
            // 
            dgvOrderList.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dgvOrderList.Location = new Point(970, 69);
            dgvOrderList.Name = "dgvOrderList";
            dgvOrderList.RowHeadersWidth = 51;
            dgvOrderList.RowTemplate.Height = 29;
            dgvOrderList.Size = new Size(494, 539);
            dgvOrderList.TabIndex = 1;
            dgvOrderList.CellContentClick += dgvOrderList_CellContentClick;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(727, 148);
            label1.Name = "label1";
            label1.Size = new Size(49, 20);
            label1.TabIndex = 2;
            label1.Text = "Name";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Location = new Point(727, 220);
            label2.Name = "label2";
            label2.Size = new Size(41, 20);
            label2.TabIndex = 3;
            label2.Text = "Price";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Location = new Point(727, 299);
            label3.Name = "label3";
            label3.Size = new Size(65, 20);
            label3.TabIndex = 4;
            label3.Text = "Quantity";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Location = new Point(717, 536);
            label4.Name = "label4";
            label4.Size = new Size(82, 20);
            label4.TabIndex = 5;
            label4.Text = "Thành tiền ";
            // 
            // btnAdd
            // 
            btnAdd.Location = new Point(767, 347);
            btnAdd.Name = "btnAdd";
            btnAdd.Size = new Size(130, 32);
            btnAdd.TabIndex = 6;
            btnAdd.Text = "Add Item";
            btnAdd.UseVisualStyleBackColor = true;
            btnAdd.Click += btnAdd_Click;
            // 
            // btnDone
            // 
            btnDone.Location = new Point(767, 448);
            btnDone.Name = "btnDone";
            btnDone.Size = new Size(130, 64);
            btnDone.TabIndex = 7;
            btnDone.Text = "Prepare the bill";
            btnDone.UseVisualStyleBackColor = true;
            btnDone.Click += btnDone_Click;
            // 
            // nuQuantity
            // 
            nuQuantity.Location = new Point(794, 297);
            nuQuantity.Name = "nuQuantity";
            nuQuantity.Size = new Size(150, 27);
            nuQuantity.TabIndex = 8;
            // 
            // txtPrice
            // 
            txtPrice.Location = new Point(794, 217);
            txtPrice.Name = "txtPrice";
            txtPrice.Size = new Size(150, 27);
            txtPrice.TabIndex = 9;
            // 
            // txtName
            // 
            txtName.Location = new Point(794, 145);
            txtName.Name = "txtName";
            txtName.Size = new Size(150, 27);
            txtName.TabIndex = 10;
            // 
            // label5
            // 
            label5.BackColor = SystemColors.GradientActiveCaption;
            label5.CausesValidation = false;
            label5.Font = new Font("Segoe UI", 25.8000011F, FontStyle.Regular, GraphicsUnit.Point);
            label5.Location = new Point(12, 9);
            label5.Name = "label5";
            label5.Size = new Size(1452, 57);
            label5.TabIndex = 11;
            label5.Text = "Order Manage";
            label5.TextAlign = ContentAlignment.TopCenter;
            // 
            // label6
            // 
            label6.BackColor = SystemColors.GradientActiveCaption;
            label6.Font = new Font("Segoe UI", 24F, FontStyle.Regular, GraphicsUnit.Point);
            label6.Location = new Point(717, 74);
            label6.Name = "label6";
            label6.Size = new Size(247, 56);
            label6.TabIndex = 12;
            label6.Text = "Hóa đơn";
            label6.TextAlign = ContentAlignment.TopCenter;
            // 
            // txtThanhtien
            // 
            txtThanhtien.Location = new Point(805, 533);
            txtThanhtien.Name = "txtThanhtien";
            txtThanhtien.Size = new Size(150, 27);
            txtThanhtien.TabIndex = 13;
            // 
            // button1
            // 
            button1.Location = new Point(767, 576);
            button1.Name = "button1";
            button1.Size = new Size(130, 32);
            button1.TabIndex = 14;
            button1.Text = "Done";
            button1.UseVisualStyleBackColor = true;
            button1.Click += button1_Click;
            // 
            // OrderForm
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1476, 630);
            Controls.Add(button1);
            Controls.Add(txtThanhtien);
            Controls.Add(label6);
            Controls.Add(label5);
            Controls.Add(txtName);
            Controls.Add(txtPrice);
            Controls.Add(nuQuantity);
            Controls.Add(btnDone);
            Controls.Add(btnAdd);
            Controls.Add(label4);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(label1);
            Controls.Add(dgvOrderList);
            Controls.Add(dgvMenu);
            Name = "OrderForm";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "OrderForm";
            Load += OrderForm_Load;
            ((System.ComponentModel.ISupportInitialize)dgvMenu).EndInit();
            ((System.ComponentModel.ISupportInitialize)dgvOrderList).EndInit();
            ((System.ComponentModel.ISupportInitialize)nuQuantity).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private DataGridView dgvMenu;
        private DataGridView dgvOrderList;
        private Label label1;
        private Label label2;
        private Label label3;
        private Label label4;
        private Button btnAdd;
        private Button btnDone;
        private NumericUpDown nuQuantity;
        private TextBox txtPrice;
        private TextBox txtName;
        private Label label5;
        private Label label6;
        private TextBox txtThanhtien;
        private Button button1;
    }
}