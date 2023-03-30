import { IonAvatar, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Fragment } from 'react';
import { useData } from '../hooks/useData';
import './Home.css';

const Home: React.FC = () => {
  const { data } = useData();
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          { data.map((item: any, index) => {
            return (
              <Fragment key={index}>
                <IonItem routerLink={ `home/details/${item.email}` }>
                  <IonAvatar slot='start'>
                    <IonImg src={ item.picture.thumbnail } />
                  </IonAvatar>
                  <IonLabel>{ item.email }</IonLabel>
                </IonItem>
              </Fragment>
            )
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
