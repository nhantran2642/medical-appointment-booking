import React from 'react';
import './style.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BlogSidebar from '../blogSidebar';
import { mockBlogPosts } from '../../mock';

const BlogPostDetail = () => {
    const blogPosts = mockBlogPosts;
    const { id } = useParams();
    const navigate = useNavigate();

    const currentId = parseInt(id, 10);
    const totalArticles = blogPosts.length;
    const currentPost = blogPosts.find(post => post.id === currentId);


    if (!currentPost) {
        return <div className="error">Bài viết không tồn tại.</div>;
    }

    const goToPrevious = () => {
        if (currentId > 1) {
            navigate(`/blogspage/${currentId - 1}`);
        }
    };

    const goToNext = () => {
        if (currentId < totalArticles) {
            navigate(`/blogspage/${currentId + 1}`);
        }
    };

    return (
        <div className="blog-post-detail">
            <div className="header" style={{ backgroundImage: `url(${require('../../assets/img/SubHead-detailblog.png')})` }}>
                <div className="title-head">
                    <Link to="/">Trang chủ</Link> / <Link to="/blogspage">Tin tức</Link> / Health Care
                </div>
                <h1>{currentPost.title}</h1>
                <p className="meta-info">
                    <span><img src={require('../../assets/img/schedule.png')} alt="Schedule" /> {new Date(currentPost.date).toLocaleDateString()}</span> |
                    <span><img src={require('../../assets/img/author.png')} alt="Author" /> By {currentPost.author}</span> |
                    <span><img src={require('../../assets/img/view.png')} alt="Views" /> {currentPost.views}</span> |
                    <span><img src={require('../../assets/img/like.png')} alt="Likes" /> {currentPost.likes}</span>
                </p>
            </div>
            <div className="content-detail-blog">
                <div className="main-content">
                    <img src={currentPost.image} alt="Main Post" className="main-image" />
                    <p>{currentPost.description}</p>
                    <div className="navigation">
                        {currentId > 1 && (
                            <button className="nav-button" onClick={goToPrevious}>
                                Previous Article
                            </button>
                        )}
                        {currentId < totalArticles && (
                            <button className="nav-button" onClick={goToNext}>
                                Next Article
                            </button>
                        )}
                    </div>
                </div>
                <BlogSidebar />
            </div>
        </div>
    );
};

export default BlogPostDetail;
