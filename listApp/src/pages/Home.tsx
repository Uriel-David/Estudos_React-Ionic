import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'; 
import { Fragment, useEffect, useState } from 'react';
import { useData } from '../hooks/useData';
import './Home.css';

const Home: React.FC = () => {
  const { data } = useData();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterSearch, setFilterSearch] = useState<any[]>(data);

  useEffect(() => {
    console.log("[]");
    setFilterSearch(data);
  }, []);

  useEffect(() => {
    console.log("[searchQuery, data]");
    const dataFiltered = data.filter((user) => !user.email.indexOf(searchQuery));
    setFilterSearch(dataFiltered);
  }, [searchQuery, data]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color='primary'>
          <IonTitle>Home</IonTitle>
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon icon={personCircleOutline} slot='icon-only'></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color='primary'>
          <IonSearchbar onIonInput={event => setSearchQuery(event.detail.value!)} value={searchQuery}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {filterSearch.map((item: any, index: number) => {
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
