I. Notebook hourse-price được xây dựng dựa trên cuộc thi [House Prices: Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques) của Kaggle.
<h2>Cách hiện thực:</h2>
1. Khảo sát dữ liệu:Nhằm tìm ra xu hướng và các đặc trưng chính của toàn bộ dữ liệu.
- Dùng các đồ thị, so sánh với phân phối chuẩn để phân tích phân phối đơn biến.
- Phân tích tương quan giữa các thuộc tính(feature) với nhau.
2. Tiền xử lý dữ liệu:
a. Làm sạch dữ liệu:
- Tìm các phần tử gây nhiễu(outlayer) và loại bỏ chúng. Các phần tử outlayer có thể gây nhiễu làm cho mô hình ít chính xác hơn. Đôi lúc số phần tử nhiễu tương đối nhiều, ta có thể quản lý chung riêng lẽ và xây dựng mộ mô hình(model) riêng cho chúng, sau đó kết hợp kết quả với model ban đầu nhằm thu được kết quả tốt hơn.
-
b. Biến đổi dữ liệu:
- Xử lý dữ liệu bị thiếu(mising value)
	+ Có thể thay missing value bằng giá trị trung bình(mean), giá trị trung vị(median) của thuộc feature.</br>
	+ Gom cụm theo "neighborhood" của feature có missing value, sau đó thay các missing value bằng median hay mean.</br>
	+ Thay missing value bằng value có tần số xuất hiện nhiều nhất.</br>
	+ Phân tích tương quan giữa các feature với nhau và tìm feature mà có tương quan thuận cao nhất với feature với , dùng tương quan thay missing value tương ứng. </br>

<h2>Kinh nghiệm hiện thực:</h2>
Phân tích phần tử cần dự đoán(predict) đầu tiên.


Nguồn tham khảo:
1. [Comprehensive data exploration with Python](https://www.kaggle.com/pmarcelino/comprehensive-data-exploration-with-python) by Pedro Marcelino
