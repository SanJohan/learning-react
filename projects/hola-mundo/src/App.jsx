import React from 'react'
import './App.css'
import TwitterFollowCard  from './TwitterFollowCard.jsx'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel angel duran',
    isFollowing: false,
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true,
  },
  {
    userName: 'TmChein',
    name: 'Tomas',
    isFollowing: false,
  },

]

function App(){

  return (
    <section className = "App">
      {
        users.map(({userName, name, isFollowing}) => (
            <TwitterFollowCard 
              key ={userName}
              initialIsFollowing={isFollowing}
              userName = {userName}
            >
              {name}
            </TwitterFollowCard>
         )
        )
      }
      <TwitterFollowCard userName="facebook" initialIsFollowing={true}>
        Facebook
      </TwitterFollowCard>
      <TwitterFollowCard userName="johans626">
          Johan vargas
      </TwitterFollowCard> 
    </section>
    
  )
}

export default App
