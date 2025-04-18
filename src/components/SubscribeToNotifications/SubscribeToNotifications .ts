'use client'
import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import { GetUser } from '@/lib/services/auth/GetUser';
import { IUser } from '@/types/UserInformation';

const NotificationListener = () => {
  useEffect(() => {
    const subscribeToPusher = async () => {
      const user: IUser = await GetUser();
      // تعريف الـ Pusher
      const pusher = new Pusher('fac3c9e081b33d94c450', {
        cluster: 'mt1',
        authEndpoint: 'http://localhost:8000/broadcasting/auth',  
        auth: {
          headers: {
            Authorization: `Bearer 11|V73kWiI00IP1BNljZPXaId7l3M5eWmz4vcJ6V6Lt689d705f`,
          }
        }
      });
      
      // الاشتراك في القناة الخاصة بالمستخدم
      const channel = pusher.subscribe(`private-user.${6}`);
      
      // الاستماع للـ event الذي يتم بثه
      channel.bind('my-event', (data) => {
        console.log('📢 New notification:', data);
        toast.info(data.message); // عرض الإشعار
      });
      
      // تنظيف الاشتراك عندما يتفك الكومبوننت
      // return () => {
        //   channel.unbind_all();
        //   channel.unsubscribe();
        // };
      };
      
      // استدعاء الاشتراك في Pusher
      subscribeToPusher();

  }, []); // تأكد أن الـ effect بيتم تشغيله مرة واحدة فقط بعد أول render

  return null; // مش لازم ترجع أي حاجة هنا لأنك مش بحاجة لواجهة في هذا الكومبوننت
};

export default NotificationListener;
