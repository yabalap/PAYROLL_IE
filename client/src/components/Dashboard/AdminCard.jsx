// Card.js
import React from 'react';

const AdminCard = ({ title, count, icon: Icon, additionalClass }) => {
    const isPending = additionalClass?.includes("pending");
    const iconClass = isPending ? "admin_icons" : "admin_icon";

    return (
        <div className={`TotalContainer ${additionalClass}`}>
            <div className="card">
                <div className="card-content">
                    <div className="text-content">
                        <p className="totaltxt">{count}</p>
                        <p className={`total_${title.toLowerCase().replace(/\s/g, '_')}`}>
                            {isPending ? title : `Total ${title}`}
                        </p>
                    </div>
                    <div className="icon">
                        <Icon className={iconClass} />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default AdminCard;
