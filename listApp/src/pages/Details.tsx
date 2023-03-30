import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import { useData } from '../hooks/useData';
import { UserDetailPageProps } from '../interfaces/UserDetailsPage';

const Details: React.FC<UserDetailPageProps> = ({ match }) => {
  const { getUserByEmail } = useData();
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const user = await getUserByEmail(match.params.email);
    console.log(user);
    setUser(user);
  }

  useIonViewWillEnter(async () => {
    getUser();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='home'></IonBackButton>
          </IonButtons>
          <IonTitle>{ user?.email }</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              { user?.name.first } { user?.name.last }
            </IonCardTitle>
            <IonCardContent>
              <img src={ user?.picture.large } alt='User Image' />
            </IonCardContent>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Details;
