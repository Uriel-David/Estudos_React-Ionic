import { createAnimation, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useRef, useState } from 'react';
import { useData } from '../hooks/useData';
import { UserDetailPageProps } from '../interfaces/UserDetailsPage';

const Details: React.FC<UserDetailPageProps> = ({ match }) => {
  const { getUserByEmail } = useData();
  const [user, setUser] = useState<any>(null);
  const [animation, setAnimation] = useState(null);
  const ionCardRef = useRef(null as any);

  const getUser = async () => {
    const user = await getUserByEmail(match.params.email);
    setUser(user);
  }

  useIonViewWillEnter(async () => {
    getUser();
    createAnimation('myId')
      .addElement(ionCardRef.current)
      .duration(2000)
      .fromTo('opacity', 100, 0)
      .iterations(4)
      .direction('alternate')
      .play();
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
        <IonCard ref={ionCardRef}>
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
