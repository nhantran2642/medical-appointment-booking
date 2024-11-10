import React, { useState } from 'react';
import { menuItems } from '../mock';
import { Link, useLocation } from 'react-router-dom';

const NavigationSidebar = () => {
    const location = useLocation();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const styles = {
        sidebar: {
            width: '200px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            padding: '10px',
        },
        ul: {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
        },
        li: {
            padding: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            borderRadius: '4px',
        },
        active: {
            backgroundColor: '#e0e7ff',
            borderLeft: '4px solid #3b82f6',
        },
        hover: {
            backgroundColor: '#1F2B6C',
            color: '#fff',
        },
    };

    return (
        <div style={styles.sidebar}>
            <ul style={styles.ul}>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{
                            ...styles.li,
                            ...(location.pathname === item.route ? styles.active : {}),
                            ...(hoveredIndex === index ? styles.hover : {}),
                        }}
                    >
                        <Link to={item.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavigationSidebar;
