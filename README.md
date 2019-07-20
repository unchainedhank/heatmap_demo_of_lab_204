# heatmap_demo-of-204-204-
这是一个基于wifi探针和ThingJs制作的热力图Demo
========
1.原理：
  根据802.11无线接入协议, 在手机、电脑等WiFi终端设备和无线路由器建立连接时, 会先向路由器发送Probe Request帧, 该帧以明文的方式包含了终端的MAC地址和路由器的MAC地址, 通过捕获Probe帧, 即可获得试图接入无线网络的终端的MAC地址。WiFi探针设备实际上就是一个无法接入的小型AP。该设备会定时向周围广播带有自己MAC地址和SSID的Beancon帧, 以此向范围内的终端设备标示自己的存在, 接收到Beancon帧的终端设备会向该AP发送probe request帧, 以此确认该AP的可用性。
  根据WiFi探针的特性, 当一台终端进入探测范围时, 可以捕获到其所携设备的MAC地址并开始跟踪, 而当跟踪不到该设备时, 则可认为该终端已经离开, 并由此算出该终端在此区域的停留时间。为增加系统容错性并保证及时性, 当3个探针周期内没有追踪到某设备时则认定该终端已经离开。当前情况提取包括数据存入和实时情况提取2个部分。在服务器中为每个探针建立1个当前设备列表, 使用键值对的方式存储。此键值对以MAC地址为键, 以包含设备进入时间和最后更新时间的对象为值。当从任务队列中提取出1次探针回传数据时, 将对其进行遍历, 更新已存在设备的最后更新时间, 并插入新加入的设备。在存入部分完成后, 需要进行实时情况提取。遍历当前设备列表, 检查列表中所有设备的最后更新时间。如果与当前时间相差超过3个探针周期,则说明该设备的确已经离开了检测范围, 应当取出列表。此时, 当前设备列表中的设备数量即可大致反映出当前捕获范围内的终端数量, 被取出列表的设备则代表了已经经过该区域的终端, 可以通过进入时间和最后更新时间得出该终端在区域内的位移和速度。为保证数据的有效性, 如果计算得出某设备在范围内停留时间过短或过长, 说明该设备并没有经过该区域或者长期停留于该区域, 应当作为无效数据舍弃。
2.设计：
  2.1OpenWrt的编译和插件的修改
    本项目采用3.10内核的openwart，宿主系统采用Ubuntu 13，固件编译包括三个不受
    （1）配置.config文件。通过make menuconfig命令生成.config文件，该文件会制定系统所需的待编译模块。其他上层应用程序无需编译进固件系统中。
    （2）编译系统。通过make v=99进行编译。
    （3）生成固件。通过makefile文件制定规则进行固件生产，这一步将内核和文件系统通过cat连接起来。
   编译完成后需要增加openwrt的插件：
    SSH支持。SSH配合Sftp可以配合大数据交互。
    curl。curl是一个常用的上传下载文件的插件包，支持断点续传。
    vsftp。常用的上传下载插件包。
  2.2数据处理平台
    基于Play框架开发，Play框架遵循Web架构中蝉蛹的MVC架构。它将应用分离到不同的层中；表现层和模型层。
    表现层进一步分为试图和控制器。Play将MVC中的三层分别放在三个不同的package中。
    模型层：在Play中由模型封装。在Play中是OO特性的Java类，包含数据结构和可执行操作。
    视图层：将模型渲染成适合交互的表单。
    控制器层：处理事件，并对模型做相应改变（通常是HTTP请求），从请求中提取数据，读取或者更新模型层，然后包装一个HTTPresponse返回。
    该项目主要为MVC中视图层的设计与实现，作为前端模块的一部分。
  2.3数据库设计
    略
  2.4Actors的设计
    Actors是一些包含状态和行为的对象，通过消息队列来传递消息。本项目采用Akka来构建可拓展的、弹性的前端应用平台。
  将服务器中实时情况键值对按照文档中的格式广播并存贮到data_now.log文件中，在thingjs中引用该本地文件的ftp地址，调用SetInterval函数
