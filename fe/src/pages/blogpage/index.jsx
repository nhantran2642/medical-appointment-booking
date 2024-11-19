import React from "react";
import "./style.scss";

const NewsTable = () => {
    const newsData = [
        { title: "Tin tức 1", date: "2024-10-01", views: 120, likes: 45 },
        { title: "Tin tức 2", date: "2024-10-05", views: 85, likes: 30 },
        { title: "Tin tức 3", date: "2024-10-10", views: 200, likes: 78 },
        { title: "Tin tức 4", date: "2024-10-15", views: 150, likes: 50 },
        { title: "Tin tức 5", date: "2024-10-20", views: 300, likes: 120 },
        { title: "Tin tức 6", date: "2024-10-25", views: 250, likes: 95 },
    ];

    const handleDelete = (id) => {
        console.log("Xóa tin tức với id:", id);
    };

    return (
        <div className="news-table-container">
            <h2>Tin Tức</h2>
            <div className="top-bar">
                <div className="search-bar">
                    <input type="text" placeholder="Tìm kiếm tin tức" />
                    <button className="search-button">
                        <span role="img" aria-label="search">🔍</span>
                    </button>
                </div>
                <button className="add-news-button">+ Thêm tin tức</button>
            </div>

            <table className="news-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tiêu đề</th>
                        <th>Ngày đăng</th>
                        <th>Lượt xem</th>
                        <th>Lượt thích</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {newsData.length > 0 ? (
                        newsData.map((news, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{news.title}</td>
                                <td>{news.date}</td>
                                <td>{news.views}</td>
                                <td>{news.likes}</td>
                                <td>
                                    <button className="delete-button" onClick={() => handleDelete(news.id)}>
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="empty-message">
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button className="page-button active">1</button>
                <button className="page-button">2</button>
                <button className="page-button">3</button>
                <button className="page-button">4</button>
            </div>
        </div>
    );
};

export default NewsTable;
