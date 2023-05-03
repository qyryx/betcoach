import { useState, useEffect } from 'react';
import Content from '../components/Content';
import Header from '../components/Header';
import httpClient from "../httpClient";
import Footer from '../components/Footer';

const MainPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [content, setContent] = useState('mainOffer');
  const [money, setMoney] = useState(0)
  const [username, setUsername] = useState("")

  useEffect(() => {
    function fetchUserInfo() {
      const token = localStorage.getItem("token");
      const headers = { Authorization: token };
      httpClient.get('/api/user', { headers })
        .then(response => {
          if (response.data && response.data.length !== 0) {
            setMoney(response.data.money);
            setUsername(response.data.username);
            setIsAuthorized(true);
          }
        })
        .catch(error => {
          window.location.href = "/login";
          console.log(error)
        });
    }
    fetchUserInfo();
  }, []);

  return (
    <div className='bg'>
      <div className='mainBox'>
        {isAuthorized ?
          (<>
            <Header setContent={setContent} money={money} username={username} />
            <Content content={content} />
            <Footer />
          </>) : null}
      </div>
    </div>
  )
}

export default MainPage