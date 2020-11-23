import React, {useEffect, useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,Alert } from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchPollVotes, pollVoteAction} from '../actions/pollActions';
import {AuthContext} from '../utils/context';

const BookPoll = ({currentPoll, closeModal, fetchPollVotes, pollVoteAction, votes}) => {
  const user = useContext(AuthContext);
  useEffect(() => {
    getPollVotes(currentPoll.id);
  }, [])

  getPollVotes = async pollid => {
    await fetchPollVotes(pollid);
  };

    onClosePress = () => {
        closeModal();
      };

    addVote =  async pollIndex => {
      await pollVoteAction({
        pollId: currentPoll.id, 
        pollIndex
      });
    };

    removeVote = index => {
      console.log('remove '+index);
    }

      const createTwoButtonAlert = index =>
        Alert.alert(
          'Vote',
          'Click OK to add your vote?',
          [
            {
              text: 'Cancel',
              onPress: () => false,
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
              if(user !== null){
                //TODO: check if user is a member
                if (getUserVote(user.username).pollIndex === (index)) {
                  removeVote(index);
                } else {
                  addVote(index);
                }
              }else{
                Alert.alert('Failed', 'Kindly login to vote.');
              }
              
            }},
          ],
          {cancelable: false},
        );

    getVotesByIndex = index => {
      let votePercent;
      const firstIndex = votes.filter(item => {
        return item.pollIndex == index;
      });
      if (votes.length == 0) {
        votePercent = 0;
      } else {
        votePercent = (firstIndex.length / votes.length) * 100;
      }
      return Math.round(votePercent);
    }

    getUserVote = username => {
      let getVoteByUser;
      if (votes.length !== 0) {
        getVoteByUser = votes.find(vote => {
          return vote.user.username == username; 
        });
        if(getVoteByUser == undefined) getVoteByUser = {};
      }else{
        getVoteByUser = {}
      }
      return getVoteByUser;
    }

    showPollBooks = (item, index) => {
      return <TouchableOpacity key={index} onPress={() => {createTwoButtonAlert(index + 1)}}>
        <View style={styles.pollSingle}>
            <View style={styles.progressSingle}>
                <View style={[styles.inner, {width: `${getVotesByIndex(index + 1)}%`}]}>
                <Text style={styles.innerText}>{getVotesByIndex(index + 1)}%</Text>
                </View>
            </View>
          {user !== null && getUserVote(user.username).pollIndex === (index + 1) ? 
            <Text style={[styles.pollText, {color: 'red'}]}>{item}</Text> :
            <Text style={[styles.pollText, {color: '#444444'}]}>{item}</Text>
          }
        </View>
      </TouchableOpacity>
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title}>{currentPoll.pollName}</Text>
                <Text style={styles.shortText}>Wow another book finished!! And now it's time to decide an addition to our reading list. please vote for the book you would like us to read.</Text>
                <View style={styles.progressContainer}>
                  {currentPoll.books.map(showPollBooks)}
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.6} style={styles.join} onPress={onClosePress}>
            <Text style={styles.joinText}>Cancel</Text>
          </TouchableOpacity>
            
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
  votes: state.poll.votes,
});

export default connect(
  mapStateToProps,
  {fetchPollVotes, pollVoteAction},
)(BookPoll);

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginHorizontal: 20,
        //height: '50%',
        width: '95%',
        
        
        //justifyContent: 'center',
        //alignItems: 'center'
      },
      body: {
        backgroundColor: '#fff',
        //marginTop: 2,
        borderRadius: 15,
        padding: 20
      },
      title: {
        fontSize: 18,
        fontFamily: 'Nunito-Bold',
      },
      shortText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 15,
        lineHeight: 23,
        marginTop: 10
      },
      join: {
        //width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 25,
        marginBottom: 10,
        backgroundColor: '#fff',
        //marginHorizontal: 20,
      },
      joinText: {
        fontSize: 16,
        fontFamily: 'Nunito-SemiBold',
        color: '#000'
      },
      progressContainer: {
          marginTop: 15
      },
      progressSingle: {
        width: '100%',
        height: 40,
        //padding: 3,
        //borderColor: '#aaa',
        //borderWidth: 3,
        borderRadius: 15,
        justifyContent: 'center',
        backgroundColor: '#ddd',
      },
      inner: {
        height: 40,
        backgroundColor: '#059e2e',
        borderRadius: 15,
        justifyContent: 'center',
        overflow: 'visible',
        position: 'relative'
        //alignItems: 'center'
      },
      innerText: {
        fontSize: 16,
        fontFamily: 'Nunito-SemiBold',
        position: 'absolute',
        left: 15
      },
      pollSingle: {
        marginTop: 20,
      },
      pollText: {
        paddingHorizontal: 15,
        marginTop: 5,
        fontSize: 15,
        fontFamily: 'Nunito-SemiBold'
      }
})
