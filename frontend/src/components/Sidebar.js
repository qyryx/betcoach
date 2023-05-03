import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';
import { US, CA, SK, DE, GB, FR, ES, IT } from 'country-flag-icons/react/3x2'
import MenuItem from './MenuItem';
import worldFlag from '../images/world.png';

const menu = [
    {
        id: 1,
        title: 'Football',
        icon: <RiIcons.RiFootballLine size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subItems: [
            {
                id: 'england',
                title: 'Premier League',
                path: '/overview/users',
                icon: <GB title="United States" className='flagIcon'/>
            },
            {
                id: 'germany',
                title: 'Bundesliga',
                path: '/overview/revenue',
                icon: <DE title="United States" className='flagIcon'/>
            },
            {
                id: 'spain',
                title: 'La Liga',
                path: '/overview/revenue',
                icon: <ES title="United States" className='flagIcon'/>
            },
            {
                id: 'italy',
                title: 'Serie A',
                path: '/overview/revenue',
                icon: <IT title="United States" className='flagIcon'/>
            },
            {
                id: 'france',
                title: 'Ligue 1',
                path: '/overview/revenue',
                icon: <FR title="United States" className='flagIcon'/>
            }
        ]
    },
    {
        id: 2,
        title: 'Hockey',
        icon: <FaIcons.FaHockeyPuck size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subItems: [
            {
                id: 'nhl',
                title: 'NHL',
                path: '/overview/users',
                icon: <US title="United States" className='flagIcon'/>
            },
            {
                id: 'ahl',
                title: 'AHL',
                path: '/overview/revenue',
                icon: <US title="United States" className='flagIcon'/>
            },
            {
                id: 'whl',
                title: 'WHL',
                path: '/overview/revenue',
                icon: <CA title="United States" className='flagIcon'/>
            },
            {
                id: 'iihf',
                title: 'World Championship',
                path: '/overview/revenue',
                icon: <img src={worldFlag} alt="world" style={{ width: 25, height: 17, marginLeft: 2 }} />
            }
        ]
    },
    {
        id: 3,
        title: 'Tennis',
        icon: <IoIcons.IoIosTennisball size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subItems: [
            {
                id: 'wta',
                title: 'WTA Madrid',
                path: '/overview/users',
                icon: <ES title="United States" className='flagIcon'/>
            },
            {
                id: 'atp',
                title: 'ATP Madrid',
                path: '/overview/revenue',
                icon: <ES title="United States" className='flagIcon'/>
            },
        ]
    },
    {
        id: 4,
        title: 'MMA',
        icon: <GiIcons.GiBoxingGlove size={20}/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpen: <RiIcons.RiArrowUpSFill />,
        subItems: [
            {
                id: 'oktagon',
                title: 'Oktagon',
                path: '/overview/users',
                icon: <SK title="United States" className='flagIcon'/>
            },
            {
                id: 'ufc',
                title: 'UFC',
                path: '/overview/revenue',
                icon: <US title="United States" className='flagIcon'/>
            },
        ]
    },
]

const Sidebar = ({ category, setCategory }) => {
    return (
        <div className='offerMenu'>
            {menu.map((item) => (
                <MenuItem item={item} setCategory={setCategory} category={category} key={item.id} />
            ))}
        </div>
    );
};

export default Sidebar