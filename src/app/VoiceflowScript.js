'use client'; 

import { useEffect } from 'react';

const VoiceflowScript = () => {
  useEffect(() => {

    const script = document.createElement('script');
    script.type = 'text/javascript';


    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    script.onload = () => {

      window.voiceflow.chat.load({
        verify: { projectID: '675939de24f74cc5f29aef1a' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };


    const firstScriptTag = document.getElementsByTagName('script')[0];


    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);


    return () => {
      script.remove();
    };
  }, []); 

  return null; 
};

export default VoiceflowScript;
