'use client';

import { useEffect } from 'react';

const VoiceflowScript = () => {
  useEffect(() => {
    
    const v = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];
    
    v.type = 'text/javascript';
    v.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';

    
    v.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: '675939de24f74cc5f29aef1a' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };

    
    s.parentNode.insertBefore(v, s);

   
    return () => {
      v.remove();
    };
  }, []); 

  return null; 
};

export default VoiceflowScript;
