import styled from 'styled-components/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {enrollModalVisibleState, usernameState} from '../../atom/shared';
import ClosableModalLayout from '../ClosableModalLayout';
import InputUsername from './InputUsername';
import ShowUsername from './ShowUsername';

interface styleProps {
  theme: {[k: string]: string};
}

const {width, height} = Dimensions.get('window');

const ModalContainer = styled.View`
  height: ${height * 0.6}px;
  width: 85%;
  background-color: ${(props: styleProps) => props.theme.main};
  border-radius: 15px;
  overflow: hidden;
  padding: 0px 10px;
  border-width: 4px;
  border-color: ${(props: styleProps) => props.theme.modalMain};
`;
const SectionBox = styled.View`
  justify-content: center;
  align-items: center;
  height: ${(props: {height: number}) => `${props.height}px`};
`;
const Title = styled.Text`
  color: ${(props: {theme: {[k: string]: string}}) => props.theme.modalMain};
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;

  font-style: italic;
`;

const DescriptionSection = styled.ScrollView`
  flex: 1;
  padding: 10px;
`;

const Separator = styled.View`
  height: 0.3px;
  width: ${width * 0.85 - 30}px;
  background-color: ${(props: styleProps) => props.theme.placeholder};
  align-self: center;
  margin: 10px 0px;
`;

const DescriptionText = styled.Text`
  color: ${(props: styleProps) => props.theme.text};
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  margin-bottom: 10px;
`;

const DescriptionFooterText = styled.Text`
  color: ${(props: styleProps) => props.theme.placeholder};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const descriptionContent = '닉네임을 설정하고 랭킹에 참여해보세요.';
const descriptionContent2 = '닉네임만 설정하면 자동으로 기록이 랭크됩니다.';
const descriptionContent3 =
  '네이밍이 고민이시라면 인스타 아이디를 닉네임으로 설정하는 것도 방법이에요.';
const descriptionFooter2 = '부적절한 닉네임은 통보없이 삭제될 수 있습니다.';
const descriptionFooter =
  '공백은 입력하실 수 없어요. 입력시 모든 공백이 제거됩니다.';

const EnrollModal = () => {
  const [isVisible, setIsVisible] = useRecoilState(enrollModalVisibleState);
  const username = useRecoilValue(usernameState);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    //처음에 username이 공백이었다가 업데이트 되기 때문에 edited은 항상 false로 찍히고
    //그 초기값으로 렌더링되는 문제 해결을 위해
    setEdited(Boolean(username));
  }, [username]);

  return (
    <ClosableModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
      <ModalContainer>
        <SectionBox height={70}>
          <Title>Enter your nickname,</Title>
          <Title>Join the ranking</Title>
        </SectionBox>
        <Separator />
        <DescriptionSection>
          <View onStartShouldSetResponder={() => true}>
            <DescriptionText>{descriptionContent}</DescriptionText>
            <DescriptionText>{descriptionContent2}</DescriptionText>
            <DescriptionText>{descriptionContent3}</DescriptionText>
            <Separator style={{marginBottom: 20}} />
            <DescriptionFooterText>{descriptionFooter}</DescriptionFooterText>
            <DescriptionFooterText>{descriptionFooter2}</DescriptionFooterText>
          </View>
        </DescriptionSection>
        <SectionBox height={80}>
          {edited ? (
            <ShowUsername setEdited={setEdited} />
          ) : (
            <InputUsername setEdited={setEdited} />
          )}
        </SectionBox>
      </ModalContainer>
    </ClosableModalLayout>
  );
};
export default React.memo(EnrollModal);