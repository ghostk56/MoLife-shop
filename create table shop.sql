-- 產品類別
create table if not exists molife.`category`
(
`category_id` int not null auto_increment comment '產品類別編號' primary key,
`category_name` varchar(50) not null comment '類別名稱'
) comment '產品類別';

insert into molife.`category` (`category_name`) values ('寵物飼料');
insert into molife.`category` (`category_name`) values ('寵物罐頭');
insert into molife.`category` (`category_name`) values ('寵物零食');
insert into molife.`category` (`category_name`) values ('寵物用品');
insert into molife.`category` (`category_name`) values ('寵物玩具');


-- 產品
create table if not exists molife.`product`
(
`product_id` int not null auto_increment comment '產品編號' primary key,
`product_name` varchar(100) not null comment '產品名稱',
`product_details` varchar(200) not null comment '產品詳情',
`product_price` int not null comment '產品價格',
`product_qty` int not null comment '產品庫存量',
`product_status` int not null comment '產品狀態',
`product_create_date` datetime not null default CURRENT_TIMESTAMP comment '創建日期',
`animal_type_id` int not null comment '動物種類',
`category_id` int not null comment '產品類別',
CONSTRAINT fk_product_animal_type FOREIGN KEY (`animal_type_id`) REFERENCES molife.`animal_type`(`animal_type_id`),
CONSTRAINT fk_product_category FOREIGN KEY (`category_id`) REFERENCES molife.`category`(`category_id`)
) comment '產品';

insert into molife.`product` (`product_name`, `product_details`, `product_price`, `product_qty`, `product_status`, `animal_type_id`, `category_id`) values 
('product1', 900, 10, 1, 1, 1);
insert into molife.`product` (`product_name`, `product_details`, `product_price`, `product_qty`, `product_status`, `animal_type_id`, `category_id`) values 
('product2', 950, 12, 0, 2, 1);
insert into molife.`product` (`product_name`, `product_details`, `product_price`, `product_qty`, `product_status`, `animal_type_id`, `category_id`) values 
('product3', 500, 20, 1, 2, 2);
insert into molife.`product` (`product_name`, `product_details`, `product_price`, `product_qty`, `product_status`, `animal_type_id`, `category_id`) values 
('product4', 1000, 30, 1, 1, 3);
insert into molife.`product` (`product_name`, `product_details`, `product_price`, `product_qty`, `product_status`, `animal_type_id`, `category_id`) values 
('product5', 700, 6, 1, 2, 4);


-- 產品圖片
create table if not exists molife.`product_image`
(
`product_image_id` int not null auto_increment comment '產品圖片編號' primary key,
`product_id` int not null comment '產品編號',
`product_image_type` int not null comment '圖片類型',
`product_image` varchar(50) not null comment '商品圖片',
CONSTRAINT fk_product_image_product FOREIGN KEY (`product_id`) REFERENCES molife.`product`(`product_id`)
) comment '產品圖片';


-- 購物車
create table if not exists molife.`product_cart`
(
`product_cart_id` int not null auto_increment comment '購物車編號' primary key,
`member_id` int not null comment '會員流水號',
`product_id` int not null comment '產品編號',
`product_number` int not null comment '產品數量',
constraint fk_product_cart_member foreign key (`member_id`) references molife.member(`member_id`),
constraint fk_product_cart_product foreign key (`product_id`) references molife.product(`product_id`)
) comment '購物車';

insert into molife.`product_cart` (`member_id`, `product_id`, `product_number`) values (1, 1, 1);
insert into molife.`product_cart` (`member_id`, `product_id`, `product_number`) values (1, 2, 1);
insert into molife.`product_cart` (`member_id`, `product_id`, `product_number`) values (2, 1, 2);
insert into molife.`product_cart` (`member_id`, `product_id`, `product_number`) values (3, 3, 3);
insert into molife.`product_cart` (`member_id`, `product_id`, `product_number`) values (4, 4, 1);


-- 產品收藏
create table if not exists molife.`product_collection`
(
`collection_id` int not null auto_increment comment '產品收藏編號' primary key,
`member_id` int not null comment '會員流水號',
`product_id` int not null comment '產品編號',
constraint fk_product_collection_member foreign key (`member_id`) references molife.member(`member_id`),
constraint fk_product_collection_product foreign key (`product_id`) references molife.product(`product_id`)
) comment '產品收藏';

insert into molife.`product_collection` (`member_id`, `product_id`) values (1, 1);
insert into molife.`product_collection` (`member_id`, `product_id`) values (1, 5);
insert into molife.`product_collection` (`member_id`, `product_id`) values (2, 2);
insert into molife.`product_collection` (`member_id`, `product_id`) values (3, 3);
insert into molife.`product_collection` (`member_id`, `product_id`) values (4, 4);


-- 產品訂單
create table if not exists molife.`product_order`
(
`order_id` int not null auto_increment comment '訂單編號' primary key,
`member_id` int not null comment '會員流水號',
`order_date` datetime not null default CURRENT_TIMESTAMP comment '訂購日期',
`order_status` int not null comment '訂單狀態',
`order_receiver` varchar(50) not null comment '收貨人',
`order_address` varchar(100) not null comment '訂單地址',
`order_mobile` varchar(50) not null comment '聯繫方式',
`order_message` varchar(100) not null comment '訂單留言',
constraint fk_product_order_member foreign key (`member_id`) references molife.member(`member_id`)
) comment '產品訂單';

insert into molife.`product_order` (`member_id`, `order_status`, `order_receiver`, `order_address`, `order_mobile`, `order_message`) values (1, 0, 'jack', '台北市忠孝東路二段50號1樓', '0183112993', '哈瞜你好嗎!');
insert into molife.`product_order` (`member_id`, `order_status`, `order_receiver`, `order_address`, `order_mobile`, `order_message`) values (2, 0, '熊大', '台中市后里區福容路8號', '0183578993', '新年快樂!');
insert into molife.`product_order` (`member_id`, `order_status`, `order_receiver`, `order_address`, `order_mobile`, `order_message`) values (2, 1, '熊大', '台中市后里區福容路8號', '0183578993', '新年快樂!兔兔');
insert into molife.`product_order` (`member_id`, `order_status`, `order_receiver`, `order_address`, `order_mobile`, `order_message`) values (3, 1, '兔兔', '台北市信義區信義路五段7號', '0987578993', '101煙火好看嗎?!');
insert into molife.`product_order` (`member_id`, `order_status`, `order_receiver`, `order_address`, `order_mobile`, `order_message`) values (4, 0, '吳董', '台北市中山區南京東路三段217號', '0925830567', '兔年行大運!!');


-- 產品訂單明細
create table if not exists molife.`product_order_item`
(
`order_item_id` int not null auto_increment comment '訂單明細編號' primary key,
`order_id` int not null comment '訂單編號',
`product_id` int not null comment '產品編號',
`product_number` int not null comment '產品數量',
`product_price` int not null comment '產品價格',
constraint fk_product_order_item_product_order foreign key (`order_id`) references molife.product_order (`order_id`),
constraint fk_product_order_product foreign key (`product_id`) references molife.product(`product_id`)
) comment '產品訂單明細';

insert into molife.`product_order_item` (`order_id`, `product_id`, `product_number`, `product_price`) values (1, 1, 1, 900);
insert into molife.`product_order_item` (`order_id`, `product_id`, `product_number`, `product_price`) values (1, 2, 2, 1900);
insert into molife.`product_order_item` (`order_id`, `product_id`, `product_number`, `product_price`) values (2, 3, 1, 500);
insert into molife.`product_order_item` (`order_id`, `product_id`, `product_number`, `product_price`) values (3, 4, 2, 2000);
insert into molife.`product_order_item` (`order_id`, `product_id`, `product_number`, `product_price`) values (4, 5, 3, 2100);
insert into molife.`product_order_item` (`order_id`, `product_id`, `product_number`, `product_price`) values (5, 2, 1, 950);

