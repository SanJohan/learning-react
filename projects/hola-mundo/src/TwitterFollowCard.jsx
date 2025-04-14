import { useState } from 'react'
import './App.css'

function TwitterFollowCard({children, userName, initialIsFollowing}) {

  const imageSrc = `https://unavatar.io/${userName}`
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const onButtonClick = () => {
    setIsFollowing(!isFollowing)
  }
  
  const buttonText = isFollowing ? 'Siguiendo' : 'Seguir'
  const butttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

  return (
    <article className = 'tw-followCard'>
      <header className = 'tw-followCard-header'>
        <img 
          className = 'tw-followCard-avatar' 
          alt="El avatar de prueba" 
          src= {imageSrc} />
      </header>
      <div className = 'tw-followCard-info'>
        <strong>{children}</strong>
        <span
         className="tw-followCard-infoUserName">@{userName}</span>
      </div>
      <aside>
        <button className = {butttonClassName} onClick={onButtonClick}>          
           <span className = 'tw-followCard-text'>{buttonText}</span>
           <span className = 'tw-followCard-stopFollow'>Dejar de seguir</span>
        </button>
      </aside>
    </article>
  )
}

export default TwitterFollowCard


