I. Notebook hourse-price được xây dựng dựa trên cuộc thi [House Prices: Advanced Regression Techniques](https://www.kaggle.com/c/house-prices-advanced-regression-techniques) của Kaggle.
<h2>Cách hiện thực:</h2>
<h4>1. Khảo sát dữ liệu:</h4>Nhằm tìm ra xu hướng và các đặc trưng chính của toàn bộ dữ liệu.</br>
- Dùng các đồ thị, so sánh với phân phối chuẩn để phân tích phân phối đơn biến.</br>
- Phân tích tương quan giữa các thuộc tính(feature) với nhau.</br>
- Xem xét phân bố của các feature có giá trị phân loại.</br>
- Xem xét các giá trị nhiễu(outlayer).</br>
<h4>2. Tiền xử lý dữ liệu:</h4>
<h5>a. Làm sạch dữ liệu:</h5>
- Tìm các phần tử gây nhiễu(outlayer) và loại bỏ chúng. Các phần tử outlayer có thể gây nhiễu làm cho mô hình ít chính xác hơn. Đôi lúc số phần tử nhiễu tương đối nhiều, ta có thể quản lý chung riêng lẽ và xây dựng mộ mô hình(model) riêng cho chúng, sau đó kết hợp kết quả với model ban đầu nhằm thu được kết quả tốt hơn.</br>
-
<h5>b. Biến đổi dữ liệu:</h5>
- Xử lý dữ liệu bị thiếu(mising value)</br>
	+ Có thể thay missing value bằng giá trị trung bình(mean), giá trị trung vị(median) của thuộc feature.</br>
	+ Gom cụm theo "neighborhood" của feature có missing value, sau đó thay các missing value bằng median hay mean.</br>
	+ Thay missing value bằng value có tần số xuất hiện nhiều nhất.</br>
	+ Phân tích tương quan giữa các feature với nhau và tìm feature mà có tương quan thuận cao nhất với feature với , dùng tương quan thay missing value tương ứng. </br>
- Thêm feature:</br>
	+ Có thể thêm feature từ những feature có sẵn. VD:Khi khảo sát ta thấy feature diện tích ảnh hưởng lớn tới giá nhà nên ta thêm feature 'tổng diện tích' = 'diện tích tầng hầm' + 'diện tích sàn' + 'diện tích tầng 1'.</br>
- Biến đổi dữ liệu:</br>
	+ Nếu giá trị cần dự đoán chênh lệch một ít so với phân phối chuẩn ta có thể biến đổi chúng thánh log(1+x) nhằm đưa về gần phân phối chuẩn hơn.</br>
	+ Nếu độ nhọn(skew) chênh lệch quá lớn so với giá trị chuẩn(skew = 3) ta có thể Box-cox để giảm thiểu tác động của feature có skew quá lớn hoặc lấy log(1+x) (np.log1p()).</br>
<h5>c. Thu giảm dữ liệu:</h5>
- Đối với các feature có giá trị phân loại có dữ liệu tập trung hơn 90% ở một giá trị phân loại và rất ít với những giá trị còn lại. Các thuộc tính này ko có giá trị lớn khi dự đoán, ta nên loại bỏ chúng.
<h2>Kinh nghiệm hiện thực:</h2>
- Phân tích phần tử cần dự đoán(predict) đầu tiên.</br>
- Từ phân tích rút ra được tính chất của những feature.</br>
- Loại bỏ nhiễu, biến đổi dữ liệu, thu giảm dữ liệu dựa trên phân tích và tính chất dữ liệu đầu vào.</br>
- Biến đổi dữ liệu kiểm tra(test) giống như cách biến đổi dữ liệu huấn luyện(train).</br>
- Thử nghiệm có mô hình(model) với những tham số khác nhau để so sánh hiệu quả dự đoán của chúng.</br>
- Có thể dùng kết hợp nhiều mô hình(model) dự đoán khác nhau nhằm tăng hiệu quả cho việc dự đoán.</br>
</br>
<h4> Nguồn tham khảo:</h4>
1. [Comprehensive data exploration with Python](https://www.kaggle.com/pmarcelino/comprehensive-data-exploration-with-python) by Pedro Marcelino.</br>
2. [https://www.kaggle.com/juliencs/a-study-on-regression-applied-to-the-ames-dataset](https://www.kaggle.com/juliencs/a-study-on-regression-applied-to-the-ames-dataset) by Julien Cohen-Solal.
