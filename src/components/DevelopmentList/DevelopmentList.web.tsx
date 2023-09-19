import { ExternalLink } from '../ExternalLink';

import Develop from '../../constants/development/development.json';
import './DevelopmentList.css';

export const DevelopmentList = () => {
  return (
    <div className='cardContainer'>
      {Develop.map((item) => (
        <div key={item.name} className='card'>
          <h1 className='card-title'>{item.name}</h1>
          <img src={item.url} className='card-image' alt='' />
          <p className='description'>{item.description}</p>
          <div className='card-list'>
            {item.technology.map((tech) => (
              <code key={tech} className='card-code'>
                {tech}
              </code>
            ))}
          </div>
          <div className='card-list'>
            {Object.keys(item.stores).map((key) => (
              <ExternalLink key={key} href={item.stores[key]}>
                <img
                  className={`card-store-img-${key}`}
                  alt={key}
                  src={
                    key === 'ios'
                      ? '/images/AppleStore.png'
                      : key === 'android'
                      ? '/images/GooglePlay.png'
                      : key === 'chrome'
                      ? '/images/Google-Chrome-Extensions.webp'
                      : ''
                  }
                />
              </ExternalLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
