import { useState } from 'react';
import SubItem from './SubItem';

const MenuItem = ({ item, category, setCategory }) => {
    const [subMenu, setSubMenu] = useState(true);
    const showSubMenu = () => setSubMenu(!subMenu);
    return (
        <>
            <a onClick={showSubMenu} className="offerItem" href="/#" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} >
                {item.icon}
                <span className='itemText'>{item.title}</span>
                <div className='itemIcon'>
                    {subMenu ? item.iconOpen : item.iconClosed}
                </div>
            </a>
            {subMenu && item.subItems.map((item) => (
                <SubItem subItem={item} setCategory={setCategory} category={category} key={item.id} />
            ))}
        </>
    )
}

export default MenuItem