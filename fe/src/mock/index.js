import doctorImage1 from '../assets/img/doctor-1.png';
import doctorImage2 from '../assets/img/doctor-2.png';
import doctorImage3 from '../assets/img/doctor-3.png';
const mockBlogPosts = [
    {
        id: 1,
        title: "A Passion for Putting Patients First",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        date: "2021-09-09",
        author: "Author",
        views: 50,
        likes: 30,
        image: require('../assets/img/News1.png')
    },
    {
        id: 2,
        title: "Another Exciting Post",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        date: "2021-09-10",
        author: "Author",
        views: 20,
        likes: 15,
        image: require('../assets/img/News2.png')
    },
    {
        id: 3,
        title: "Another Exciting Post",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        date: "2021-09-10",
        author: "Author",
        views: 20,
        likes: 15,
        image: require('../assets/img/News2.png')
    },
    {
        id: 4,
        title: "Another Exciting Post",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        date: "2021-09-10",
        author: "Author",
        views: 20,
        likes: 15,
        image: require('../assets/img/News2.png')
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
        name: "Dr. John Doe",
        specialty: "Cardiology",
        image: require("../assets/img/doctor-1.png"),
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")]
    },
    {
        name: "Dr. Jane Smith",
        specialty: "Neurology",
        image: require("../assets/img/doctor-2.png"),
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")]
    },
    {
        name: "Dr. Emily Johnson",
        specialty: "Pediatrics",
        image: require("../assets/img/doctor-3.png"),
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")]
    },
    {
        name: "Dr. Michael Brown",
        specialty: "Orthopedics",
        image: require("../assets/img/doctor-3.png"),
        social: [require("../assets/img/linkin-1.png"), require("../assets/img/facebook-1.png"), require("../assets/img/instagram-1.png")]
    }
];

const recentPosts = [
    {
        title: "This Article's Title goes Here, but not too long.",
        date: "Monday 05, September 2021",
        image: require('../assets/img/News1.png')
    },
    {
        title: "This Article's Title goes Here, but not too long.",
        date: "Monday 05, September 2021",
        image: require('../assets/img/News2.png')
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
export { mockBlogPosts, contactDetails, doctors, recentPosts, categories, cardData, specialties, articles };