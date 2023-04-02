import { createAnimation, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useRef, useState } from 'react';
import { useData } from '../hooks/useData';
import { UserDetailPageProps } from '../interfaces/UserDetailsPage';
import './Details.css';

const Details: React.FC<UserDetailPageProps> = ({ match }) => {
  const { getUserByEmail } = useData();
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<string>('');
  const ionCardRef = useRef(null as any);

  const getUser = async () => {
    const user = await getUserByEmail(match.params.email);
    setUser(user);
  }

  const captureImage = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      quality: 100,
    });

    const image = `data:image/jpeg;base64,${photo.base64String}`;
    setImage(image);
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
        <IonButton onClick={() => captureImage}>Capture Image</IonButton>
        <img src={image} alt='Captured image' />
      </IonContent>
    </IonPage>
  );
};

export default Details;
