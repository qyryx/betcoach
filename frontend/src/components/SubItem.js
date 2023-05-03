const SubItem = ({ subItem, category, setCategory }) => {
    return (
        <a onClick={() => { setCategory(subItem.id); localStorage.setItem('category', subItem.id) }} className="nav-link" href="/#" style={{ cursor: 'pointer' }}>
            <div className={subItem.id === category ? 'subItem subItemClicked' : 'subItem'}>
                {subItem.icon}
                <span className='subItemText'>{subItem.title}</span>
            </div>
        </a>
    )
}

export default SubItem