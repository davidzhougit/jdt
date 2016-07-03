-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: jiudin.rdsm8833unmye07.rds.bj.baidubce.com
-- Generation Time: 2016-01-27 16:21:52
-- 服务器版本： 5.6.20-baidu-20150209-log
-- PHP Version: 5.5.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jiudin`
--

-- --------------------------------------------------------

--
-- 表的结构 `jiudinchar`
--

CREATE TABLE IF NOT EXISTS `jiudinchar` (
  `id` int(6) NOT NULL COMMENT 'id',
  `name` varchar(128) NOT NULL,
  `content` varchar(1024) NOT NULL COMMENT '内容文字',
  `filltext` varchar(1024) DEFAULT NULL COMMENT '填字顺序'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `poem`
--

CREATE TABLE IF NOT EXISTS `poem` (
  `id` int(6) NOT NULL,
  `title` varchar(128) NOT NULL COMMENT '标题',
  `content` varchar(4096) NOT NULL COMMENT '内容',
  `type` int(2) NOT NULL DEFAULT '1' COMMENT '类型：1:初级，2:中级，3:高级',
  `answer` varchar(4096) DEFAULT NULL COMMENT '参考答案'
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `poem`
--

INSERT INTO `poem` (`id`, `title`, `content`, `type`, `answer`) VALUES
(1, '春晓', '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。', 0, '[{"char":"春","rdx":"r11","idx":"0"},{"char":"眠","rdx":"r13","idx":"1"},{"char":"不","rdx":"r15","idx":"2"},{"char":"觉","rdx":"r21","idx":"3"},{"char":"晓","rdx":"r23","idx":"4"},{"char":"处","rdx":"r12","idx":"5"},{"char":"处","rdx":"r14","idx":"6"},{"char":"闻","rdx":"r16","idx":"7"},{"char":"啼","rdx":"r22","idx":"8"},{"char":"鸟","rdx":"r24","idx":"9"},{"char":"夜","rdx":"r27","idx":"10"},{"char":"来","rdx":"r25","idx":"11"},{"char":"风","rdx":"r28","idx":"12"},{"char":"雨","rdx":"r26","idx":"13"},{"char":"声","rdx":"r17","idx":"14"},{"char":"花","rdx":"r18","idx":"15"},{"char":"落","rdx":"r2","idx":"16"},{"char":"知","rdx":"r7","idx":"17"},{"char":"多","rdx":"r20","idx":"18"},{"char":"少","rdx":"r19","idx":"19"}]'),
(2, '月下独酌', '花间一壶酒，独酌无相亲。 \n举杯邀明月，对影成三人。 \n月既不解饮，影徒随我身。 \n暂伴月将影，行乐须及春。 \n我歌月徘徊，我舞影零乱。 \n醒时同交欢，醉后各分散。 \n永结无情游，相期邈云汉。', 3, ''),
(3, '登鹳雀楼', '白日依山尽，黄河入海流。 欲穷千里目，更上一层楼。', 1, '[{"char":"白","rdx":"r14","idx":"0"},{"char":"日","rdx":"r11","idx":"1"},{"char":"依","rdx":"r12","idx":"2"},{"char":"山","rdx":"r13","idx":"3"},{"char":"尽","rdx":"r17","idx":"4"},{"char":"黄","rdx":"r27","idx":"5"},{"char":"河","rdx":"r26","idx":"6"},{"char":"入","rdx":"r28","idx":"7"},{"char":"海","rdx":"r25","idx":"8"},{"char":"流","rdx":"r18","idx":"9"},{"char":"欲","rdx":"r19","idx":"10"},{"char":"穷","rdx":"r21","idx":"11"},{"char":"千","rdx":"r22","idx":"12"},{"char":"里","rdx":"r24","idx":"13"},{"char":"目","rdx":"r23","idx":"14"},{"char":"更","rdx":"r15","idx":"15"},{"char":"上","rdx":"r16","idx":"16"},{"char":"一","rdx":"r2","idx":"17"},{"char":"层","rdx":"r7","idx":"18"},{"char":"楼","rdx":"r20","idx":"19"}]'),
(4, '鹿柴', '空山不见人，但闻人语响。 返影入深林，复照青苔上。', 1, '[{"char":"空","rdx":"r12","idx":"0"},{"char":"山","rdx":"r11","idx":"1"},{"char":"不","rdx":"r27","idx":"2"},{"char":"见","rdx":"r1","idx":"3"},{"char":"人","rdx":"r13","idx":"4"},{"char":"但","rdx":"r15","idx":"5"},{"char":"闻","rdx":"r18","idx":"6"},{"char":"人","rdx":"r14","idx":"7"},{"char":"语","rdx":"r22","idx":"8"},{"char":"响","rdx":"r21","idx":"9"},{"char":"返","rdx":"r23","idx":"10"},{"char":"影","rdx":"r24","idx":"11"},{"char":"入","rdx":"r28","idx":"12"},{"char":"深","rdx":"r19","idx":"13"},{"char":"林","rdx":"r5","idx":"14"},{"char":"复","rdx":"r25","idx":"15"},{"char":"照","rdx":"r26","idx":"16"},{"char":"青","rdx":"r16","idx":"17"},{"char":"苔","rdx":"r6","idx":"18"},{"char":"上","rdx":"r10","idx":"19"}]'),
(5, '江雪', '千山鸟飞绝，万径人踪灭。 孤舟蓑笠翁，独钓寒江雪。', 1, ''),
(6, '相思', '红豆生南国，春来发几枝。 愿君多采撷，此物最相思。', 0, ''),
(7, '登乐游原', '向晚意不适，驱车登古原。 夕阳无限好，只是近黄昏。', 1, ''),
(8, '杂诗', '君自故乡来，应知故乡事。 来日绮窗前，寒梅著花未。', 1, ''),
(9, '弹琴', '泠泠七弦上，静听松风寒。 古调虽自爱，今人多不弹。', 1, ''),
(10, '草', '离离原上草，一岁一枯荣。 野火烧不尽。春风吹又生。 远芳侵古道，晴翠接荒城。 又送王孙去，萋萋满别情。', 2, ''),
(11, '静夜思', '床前明月光，疑是地上霜。 举头望明月，低头思故乡。', 0, ''),
(12, '春望', '国破山河在，城春草木深。 感时花溅泪，恨别鸟惊心。 烽火连三月，家书抵万金。 白头搔更短，浑欲不胜簪。', 2, ''),
(13, '游子吟', '慈母手中线，游子身上衣。 临行密密缝，意恐迟迟归。 谁言寸草心，报得三春晖。', 1, ''),
(14, '登岳阳楼', '昔闻洞庭水，今上岳阳楼。 吴楚东南坼，乾坤日夜浮。 亲朋无一字，老病有孤舟。 戎马关山北，凭轩涕泗流。', 2, ''),
(15, '关山月', '明月出天山，苍茫云海间。 长风几万里，吹度玉门关。 汉下白登道，胡窥青海湾。 由来征战地，不见有人还。 戍客望边色，思归多苦颜。 高楼当此夜，叹息未应闲。', 3, ''),
(16, '送杜少府之任蜀州', '城阙辅三秦，风烟望五津。 与君离别意，同是宦游人。 海内存知己，天涯若比邻。 无为在岐路，儿女共沾巾。', 2, ''),
(17, '凉州词', '葡萄美酒夜光杯，欲饮琵琶马上催。  醉卧沙场君莫笑，古来征战几人回。', 0, ''),
(18, '渭城曲', '渭城朝雨浥轻尘，客舍青青柳色新。  劝君更尽一杯酒，西出阳关无故人。', 1, ''),
(19, '送孟浩然之广陵', '故人西辞黄鹤楼，烟花三月下扬州。  孤帆远影碧空尽，惟见长江天际流。', 1, ''),
(20, '出塞', '秦时明月汉时关，万里长征人未还。  但使龙城飞将在，不教胡马渡阴山。', 1, ''),
(21, '枫桥夜泊', '月落乌啼霜满天，江枫渔火对愁眠。  姑苏城外寒山寺，夜半钟声到客船。', 0, ''),
(22, '咏柳', '碧玉妆成一树高，万条垂下绿丝绦。  不知细叶谁裁出，二月春风似剪刀。', 1, ''),
(23, '乌衣巷', '朱雀桥边野草花，乌衣巷口夕阳斜。  旧时王谢堂前燕，飞入寻常百姓家。', 1, ''),
(24, '黄鹤楼', '昔人已乘黄鹤去，此地空余黄鹤楼。黄鹤一去不复返，白云千载空悠悠。  晴川历历汉阳树，芳草萋萋鹦鹉洲。  日暮乡关何处是，烟波江上使人愁。', 3, ''),
(25, '清明', '清明时节雨纷纷，路上行人欲断魂。  借问酒家何处有，牧童遥指杏花村。', 1, ''),
(26, '山行', '远上寒山石径斜，白云生处有人家。  停车坐爱枫林晚，霜叶红于二月花。', 1, ''),
(27, '我的九鼎作诗1', '多少级了付款记录啥地方就开了是对方家里的身份卡洛斯的开发；乐山大佛', 4, ''),
(28, '我的九鼎作诗2', '在西湖留下足迹的有谪居的政客、隐逸的文人、多情的女性、豪壮的英雄……西湖之美，美在湖光山色，美在人文历史。置身西湖，恍若与仙境的新密接触。游历西湖，犹如品尝龙井，宜慢慢品味', 4, '');

-- --------------------------------------------------------

--
-- 表的结构 `record`
--

CREATE TABLE IF NOT EXISTS `record` (
  `id` int(6) NOT NULL COMMENT '记录id',
  `uname` varchar(128) NOT NULL COMMENT '用户名称',
  `pid` int(6) NOT NULL COMMENT '诗词id',
  `times` int(2) NOT NULL DEFAULT '1' COMMENT '答题次数',
  `lastcorrect` int(3) NOT NULL,
  `lastanswer` varchar(1024) NOT NULL DEFAULT '' COMMENT '最后一次的答题结果',
  `lasttime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最后答题时间'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `record`
--

INSERT INTO `record` (`id`, `uname`, `pid`, `times`, `lastcorrect`, `lastanswer`, `lasttime`) VALUES
(2, 'admin', 1, 1, 15, '[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `sys_config`
--

CREATE TABLE IF NOT EXISTS `sys_config` (
  `id` int(6) NOT NULL,
  `pkey` varchar(128) NOT NULL,
  `pval` varchar(128) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sys_config`
--

INSERT INTO `sys_config` (`id`, `pkey`, `pval`) VALUES
(1, 'intro.fill.num', '4');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `uname` varchar(128) NOT NULL DEFAULT '' COMMENT '用户名称',
  `password` varchar(128) NOT NULL COMMENT '用户密码',
  `regdate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `score` int(6) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`uname`, `password`, `regdate`, `score`) VALUES
('15546938490', '296899', NULL, 0),
('15727301970', '123456', NULL, 0),
('15727301971', '123456', NULL, 0),
('admin', 'admin', '2016-01-24 10:22:46', 60),
('garden', '123', NULL, 0),
('test', 'test', NULL, 0),
('zengni627@qq.com', '123456', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jiudinchar`
--
ALTER TABLE `jiudinchar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `poem`
--
ALTER TABLE `poem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`),
  ADD KEY `type` (`type`) USING HASH;

--
-- Indexes for table `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sys_config`
--
ALTER TABLE `sys_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uname`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jiudinchar`
--
ALTER TABLE `jiudinchar`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT COMMENT 'id';
--
-- AUTO_INCREMENT for table `poem`
--
ALTER TABLE `poem`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `record`
--
ALTER TABLE `record`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT COMMENT '记录id',AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `sys_config`
--
ALTER TABLE `sys_config`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
