import React from 'react';
import Banner from '../../Shared/Banner';
import Journey from './Journey';
import VisionMission from './VisionMission';
import MissionImage from '../../../images/mission.png';
import VisionImage from '../../../images/vision.png';

function Index() {
  return (
    <div id='aboutUs'>
      <Banner title='About Us' />
      <Journey />
      <VisionMission
        title='Mission'
        icon={MissionImage}
        info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
      <VisionMission
        title='Vision'
        icon={VisionImage}
        info="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      />
    </div>
  );
}

export default Index;
