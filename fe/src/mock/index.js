const mockBlogPosts = [
    {
        id: 1,
        title: "Chăm sóc sức khỏe cho mọi lứa tuổi",
        description: "Khám phá những phương pháp chăm sóc sức khỏe hiệu quả dành cho mọi độ tuổi, từ trẻ em đến người già. Trong bài viết này, chúng tôi sẽ cung cấp những lời khuyên hữu ích về chế độ ăn uống, thể dục, và các bài kiểm tra sức khỏe định kỳ giúp mỗi lứa tuổi có thể duy trì một cơ thể khỏe mạnh. Việc chăm sóc sức khỏe từ sớm sẽ giúp phòng ngừa nhiều bệnh tật và đảm bảo chất lượng cuộc sống lâu dài.",
        date: "2024-09-09",
        author: "Nguyễn Văn A",
        views: 120,
        likes: 80,
        image: require('../assets/img/News1.png')
    },
    {
        id: 2,
        title: "Tầm quan trọng của việc khám sức khỏe định kỳ",
        description: "Khám sức khỏe định kỳ là một phần quan trọng trong việc duy trì sức khỏe lâu dài. Trong bài viết này, chúng tôi sẽ chỉ ra lý do tại sao mỗi người nên thực hiện khám sức khỏe định kỳ ít nhất một lần mỗi năm. Khám sức khỏe giúp phát hiện sớm các vấn đề về tim mạch, tiểu đường, và các bệnh ung thư, từ đó có phương án điều trị kịp thời, giúp tăng cơ hội chữa trị thành công.",
        date: "2024-09-12",
        author: "Trần Thị B",
        views: 95,
        likes: 60,
        image: require('../assets/img/News2.png')
    },
    {
        id: 3,
        title: "Chế độ dinh dưỡng khoa học cho người bệnh",
        description: "Dinh dưỡng đóng một vai trò quan trọng trong việc điều trị và phục hồi sức khỏe cho bệnh nhân. Trong bài viết này, chúng tôi sẽ giới thiệu một số chế độ dinh dưỡng đặc biệt dành cho các bệnh nhân đang điều trị bệnh lý như ung thư, tim mạch, và tiểu đường. Chế độ ăn uống khoa học không chỉ giúp hỗ trợ quá trình điều trị mà còn giúp người bệnh tăng cường sức đề kháng và phục hồi nhanh chóng.",
        date: "2024-09-15",
        author: "Phạm Minh C",
        views: 200,
        likes: 150,
        image: require('../assets/img/News3.png')
    },
    {
        id: 4,
        title: "Cập nhật các dịch vụ y tế tại bệnh viện XYZ",
        description: "Bệnh viện XYZ đã triển khai hàng loạt các dịch vụ y tế mới nhằm nâng cao chất lượng khám chữa bệnh và mang lại sự tiện ích tối đa cho bệnh nhân. Trong bài viết này, chúng tôi sẽ cung cấp thông tin chi tiết về các dịch vụ y tế hiện đại như phòng khám chuyên khoa, xét nghiệm sinh học, phẫu thuật nội soi và các phương pháp điều trị tiên tiến. Đặc biệt, bệnh viện còn triển khai các gói bảo hiểm y tế toàn diện cho bệnh nhân.",
        date: "2024-09-20",
        author: "Lê Thị D",
        views: 180,
        likes: 120,
        image: require('../assets/img/News4.png')
    },
   
];


const contactDetails = [
    {
        title: "Khẩn cấp",
        info: ["(237) 681-812-255", "(237) 666-331-894"],
        icon: require('../assets/img/group-188-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Địa chỉ",
        info: ["0123 Hải Phòng", "9876 Lê Duẩn"],
        icon: require('../assets/img/letter.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Email",
        info: ["meddical@gmail.com"],
        icon: require('../assets/img/group-178-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    },
    {
        title: "Giờ làm việc",
        info: ["Từ thứ hai đến thứ bảy lúc 09:00-20:00", "Chỉ khẩn cấp vào Chủ nhật"],
        icon: require('../assets/img/group-177-2.png'),
        bgColor: '#BFD2F8',
        textColor: '#1F2B6C'
    }
];

const doctors = [
    {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Tim mạch",
        image: require("../assets/img/doctor-1.png"),
        bio: "Dr. John Doe là bác sĩ tim mạch giàu kinh nghiệm với hơn 15 năm hành nghề, chuyên về bệnh tim và phẫu thuật.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Tim mạch',
        price: 500000
    },
    {
        id: 2,
        name: "Dr. Jane Smith",
        specialty: "Nội khoa",
        image: require("../assets/img/doctor-2.png"),
        bio: "Dr. Jane Smith là bác sĩ chuyên khoa nội với hơn 10 năm kinh nghiệm trong việc điều trị các bệnh lý về nội tiết và tiêu hóa.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Nội khoa',
        price: 450000
    },
    {
        id: 3,
        name: "Dr. Emma Johnson",
        specialty: "Nhi khoa",
        image: require("../assets/img/doctor-3.png"),
        bio: "Dr. Mark Lee là bác sĩ nhi khoa với 12 năm kinh nghiệm trong điều trị các bệnh lý cho trẻ em và trẻ sơ sinh.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Nhi khoa',
        price: 400000
    },
    {
        id: 4,
        name: "Dr. Alice Wang",
        specialty: "Sản phụ khoa",
        image: require("../assets/img/doctor-4.png"),
        bio: "Dr. Alice Wang là bác sĩ sản phụ khoa với hơn 8 năm kinh nghiệm trong việc theo dõi thai kỳ và chăm sóc sức khỏe phụ nữ.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Sản phụ khoa',
        price: 600000
    },
    {
        id: 5,
        name: "Dr. William Brown",
        specialty: "Ngoại khoa",
        image: require("../assets/img/doctor-5.png"),
        bio: "Dr. William Brown là bác sĩ ngoại khoa với hơn 20 năm kinh nghiệm trong các ca phẫu thuật phức tạp và điều trị chấn thương.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Ngoại khoa',
        price: 750000
    },
    {
        id: 6,
        name: "Dr. Mark Lee",
        specialty: "Răng hàm mặt",
        image: require("../assets/img/doctor-6.png"),
        bio: "Dr. Emma Johnson là bác sĩ răng hàm mặt, chuyên về điều trị các vấn đề về răng miệng và phẫu thuật thẩm mỹ.",
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")],
        department: 'Răng hàm mặt',
        price: 500000
    }

];

const recentPosts = [
    {
        title: "Tiêu đề bài viết này ở đây, nhưng không quá dài.",
        date: "Thứ Hai, ngày 05 tháng 9 năm 2021",
        image: require('../assets/img/News2.png')
    },
    {
        title: "Tìm hiểu về các xu hướng sức khỏe mới nhất trong năm 2024.",
        date: "Thứ Tư, ngày 15 tháng 11 năm 2024",
        image: require('../assets/img/News3.png')
    },
    {
        title: "Cập nhật thông tin về các dịch vụ y tế tại bệnh viện XYZ.",
        date: "Thứ Sáu, ngày 25 tháng 11 năm 2024",
        image: require('../assets/img/News4.png')
    },
    {
        title: "Lợi ích của việc chăm sóc sức khỏe định kỳ và khám bệnh thường xuyên.",
        date: "Thứ Ba, ngày 20 tháng 11 năm 2024",
        image: require('../assets/img/News1.png')
    }
];

const categories = [
    { name: 'Surgery', count: 3 },
    { name: 'Health Care', count: 5 },
    { name: 'Medical', count: 8 },
    { name: 'Professional', count: 10 }
];
const cardData = [
    {
        text: "Đặt Lịch Hẹn",
        color: "#1f2b6c",
        textColor: "#fcfefeff",
        icon: require("../assets/img/Calendar.png"),
    },
    {
        text: "Đội Ngũ Chúng Tôi",
        color: "#bfd2f8ff",
        textColor: "#1f2b6cff",
        icon: require("../assets/img/Team.png"),
    },
    {
        text: "Quản Lý Thanh Toán",
        color: "#159eecff",
        textColor: "#fcfefeff",
        icon: require("../assets/img/Cash.png"),
    },
];

const specialties = [
    { name: 'Khoa Thần Kinh' },
    { name: 'Khoa Mắt' },
    { name: 'Khoa Tiêu Hóa' },
    { name: 'Khoa Ung Bướu' },
    { name: 'Khoa Tim Mạch' },
    { name: 'Khoa Tiết Niệu' },
    { name: 'Khoa Cơ Xương Khớp' },
    { name: 'Khoa Hô Hấp' },
    { name: 'Khoa Da Liễu' },
    { name: 'Khoa Tai Mũi Họng' },
    { name: 'Khoa Thận' },
    { name: 'Khoa Phụ Khoa' },
];
const articles = [
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    },
    {
        date: "Monday 05, September 2021 | By Author",
        title: "This Article’s Title goes Here, but not too long.",
        image: require('../assets/img/news.png'),
        views: 68,
        likes: 86
    }
];
const menuItems = [
    { label: 'Hồ sơ', route: '/profile' },
    { label: 'Lịch khám', route: '/schedule' }, 
    { label: 'Hồ sơ bệnh án', route: '/medical-record' },
    { label: 'Thông báo', route: '/notifications' },
    { label: 'Đăng xuất', route: '/login' },
];
const schedules = [
    {
        id: 1,
        name: 'Sally Trần',
        email: 'sallysayhi@gmail.com',
        date: '10/10/2024',
        time: '9h-10h SA',
        doctor: 'Mai Văn Hà',
        department: 'Răng-Hàm-Mặt',
        status: 'Sắp tới',
    },
    {
        id: 2,
        name: 'Sally Trần',
        email: 'sallysayhi@gmail.com',
        date: '18/10/2024',
        time: '9h-10h SA',
        doctor: 'Mai Văn Hà',
        department: 'Răng-Hàm-Mặt',
        status: 'Đã khám',
    },
    {
        id: 3,
        name: 'John Doe',
        email: 'johndoe@example.com',
        date: '20/10/2024',
        time: '10h-11h SA',
        doctor: 'Nguyễn Văn A',
        department: 'Tim mạch',
        status: 'Sắp tới',
    },
    {
        id: 4,
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        date: '22/10/2024',
        time: '11h-12h CH',
        doctor: 'Trần Thị B',
        department: 'Nhi',
        status: 'Đã khám',
    },
    {
        id: 5,
        name: 'Alice Nguyễn',
        email: 'alicenguyen@example.com',
        date: '25/10/2024',
        time: '1h-2h CH',
        doctor: 'Lê Văn C',
        department: 'Ngoại',
        status: 'Sắp tới',
    },
    {
        id: 6,
        name: 'Bob Trần',
        email: 'bobtran@example.com',
        date: '28/10/2024',
        time: '2h-3h CH',
        doctor: 'Phạm Thị D',
        department: 'Da liễu',
        status: 'Đã khám',
    },
    {
        id: 7,
        date: '30/10/2024',
        time: '3h-4h CH',
        doctor: 'Nguyễn Văn E',
        department: 'Tai Mũi Họng',
        status: 'Sắp tới',
    }
];

const services = [
    { 
        title: "Khám sức khỏe miễn phí", 
        description: "Dịch vụ khám sức khỏe tổng quát miễn phí giúp phát hiện sớm các vấn đề sức khỏe tiềm ẩn và cung cấp lời khuyên về chăm sóc sức khỏe phù hợp.", 
        serviceImg: require('../assets/img/service-1.png'), 
        iconOverlay: require('../assets/img/medical1.png')
    },
    { 
        title: "Tư vấn dinh dưỡng miễn phí", 
        description: "Nhận tư vấn miễn phí về chế độ dinh dưỡng hợp lý để duy trì sức khỏe và phòng ngừa bệnh tật, đặc biệt là các vấn đề về tim mạch và tiểu đường.", 
        serviceImg: require('../assets/img/service-2.png'), 
        iconOverlay: require('../assets/img/medical2.png')
    },
    { 
        title: "Xét nghiệm máu miễn phí", 
        description: "Thực hiện các xét nghiệm máu cơ bản để kiểm tra các chỉ số sức khỏe quan trọng như cholesterol, đường huyết và chức năng gan.", 
        serviceImg: require('../assets/img/service-3.png'), 
        iconOverlay: require('../assets/img/medical1.png')
    },
    { 
        title: "Khám sức khỏe cho trẻ em", 
        description: "Chúng tôi cung cấp dịch vụ khám sức khỏe chuyên sâu cho trẻ em, giúp phát hiện sớm các vấn đề về sự phát triển và phòng ngừa bệnh tật.", 
        serviceImg: require('../assets/img/service-4.png'), 
        iconOverlay: require('../assets/img/medical3.png')
    },
    { 
        title: "Khám phụ khoa miễn phí", 
        description: "Dịch vụ khám phụ khoa miễn phí giúp nữ giới phát hiện các vấn đề về sức khỏe sinh sản, bao gồm xét nghiệm Pap, siêu âm phụ khoa và tư vấn sức khỏe.", 
        serviceImg: require('../assets/img/service-5.png'), 
        iconOverlay: require('../assets/img/medical4.png')
    },
    { 
        title: "Khám tim mạch miễn phí", 
        description: "Khám tim mạch miễn phí để kiểm tra các bệnh lý về tim, huyết áp cao và các vấn đề về mạch máu, giúp bạn giữ trái tim khỏe mạnh lâu dài.", 
        serviceImg: require('../assets/img/service-6.png'), 
        iconOverlay: require('../assets/img/medical2.png')
    },
];


const notifications = [
    {
        title: '🎉HOÀN TIỀN 5% khi đặt lịch tiêm HPV qua Meddical🎉',
        description: '🎉20/10 này, đừng quên chăm sóc bản thân mình bằng cách chủ động phòng ngừa HPV từ sớm Nàng nhé!📍 Bệnh viện Đa khoa Quốc tế Hoàn Mỹ Thủ Đức. 💯Đặc biệt, khi đặt lịch qua Medpro, Nàng sẽ nhận được ưu đãi hoàn tiền lên đến 5% trên tổng hóa đơn thanh toán nữa đó! 👉 Đặt lịch ngay!',
        time: '1 tuần trước',
    },
    {
        title: '🔥TẶNG VOUCHER 50% Xét Nghiệm Ung Thư Cổ Tử Cung🔥',
        description: '🔥Nhân dịp 20/10, Dr Marie dành tặng Nàng Voucher 50% gói “Xét nghiệm ung thư cổ tử cung” 🌷⏰Thời gian áp dụng: Từ nay đến hết ngày 5/11/2024. Đặc biệt hơn hết, bạn còn được hoàn tiền 5% khi đặt lịch khám qua Medpro nữa đó! Đặt khám ngay để không bỏ lỡ “Double Voucher” lần này bạn nhé!🔥',
        time: '2 tuần trước',
    },
    {
        title: '🔥Giảm giá 30% điều trị da liễu🔥',
        description: '🔥Phòng khám Chuyên khoa Da Trần Thịnh đang có chương trình GIẢM GIÁ 30% cho tất cả các gói điều trị!💡 Đừng bỏ lỡ cơ hội làm đẹp với đội ngũ bác sĩ chuyên nghiệp và công nghệ hiện đại.⚡ Ưu đãi chỉ đến hết ngày 30/9.👉 Nhanh tay đặt lịch trên Meddical nhé!',
        time: '15/09/2024 19:35',
    }
];
const hours = [
    "8h SA- 9h SA",
    "9h SA - 10h SA",
    "10h SA - 11h SA",
    "11h SA - 12h CH",
    "1h CH - 2h CH",
    "2h CH - 3h CH",
    "3h CH - 4h CH",
    "4h CH - 5h CH",
    "5h CH - 6h CH",
    "6h CH - 7h CH",
    "7h CH - 8h CH",
];
export const departments = ['Tim mạch', 'Nhi', 'Ngoại'];


export { mockBlogPosts, contactDetails, doctors, recentPosts, categories, cardData, specialties, articles, menuItems, schedules, notifications, services, hours };