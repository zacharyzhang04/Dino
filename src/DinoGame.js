import React, { useState, useEffect, useRef } from "react";
import "./DinoGame.css";

const DinoGame = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [gameSpeed, setGameSpeed] = useState(3);
    const [obstacleSpacing, setObstacleSpacing] = useState(250);
    const [gameOver, setGameOver] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);
    const dinoRef = useRef(null);
    const obstacleRef = useRef(null);
    const border = 15 + 0.42069; // hehe funny number
    
    const handleJump = () => {
        console.log("Clicked, Slay!");
        if (!isPlaying) {setIsPlaying(true);}
        if (isCooldown) return;
        
        setIsClicked(true);
        setIsCooldown(true);

        setTimeout(() => {
        setIsClicked(false);
        setIsCooldown(false);
        }, 500);
    };
    

    const handleRestart = () => {
        setIsPlaying(false);
        setScore(0);
        setGameSpeed(8);
        setObstacleSpacing(250);
        setGameOver(false);
    };
    let left = 500;
    useEffect(() => {
        let gameLoop;

        const checkCollision = () => {
            const obstacle = obstacleRef.current.getBoundingClientRect();;
            const dino = dinoRef.current.getBoundingClientRect();
            /*console.log(dino.top);
            console.log(dino.bottom);
            console.log(dino.left);
            console.log(dino.right);*/
            if (obstacle.left < dino.right - border &&
                obstacle.right > dino.left + border &&
                obstacle.top < dino.bottom - border &&
                obstacle.bottom > dino.top + border) {
                console.log("YOU LOSE");
                setGameOver(true);
                cancelAnimationFrame(gameLoop);
            }
        };
        const gameStep = () => {
            setScore((prevScore) => prevScore + 1);
            if (gameSpeed < 5) setGameSpeed((prevSpeed) => prevSpeed + 0.05);
            //setObstacleSpacing((prevSpacing) => prevSpacing - 0.5);
            checkCollision();
            left -= gameSpeed;
            obstacleRef.current.style.left = `${left}px`;
            gameLoop = requestAnimationFrame(gameStep);
        };

        if (isPlaying) { gameStep(); }

        return () => cancelAnimationFrame(gameLoop);
    }, [isPlaying]);
    

    return (
        <div className="game-container">
        <div className="game-score">{gameOver ? "Game Over" : `Score: ${score}`}</div>
        {gameOver ? (<button onClick={handleRestart}>Restart</button>) : (
            
            <div className="game-playarea" onClick={handleJump}>
                <svg ref={dinoRef} className={`dino ${isClicked ? 'jump' : ''}`}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 
                3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 
                8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 
                0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 
                0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 
                00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 
                3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 
                3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082" /></svg>
                <svg ref={obstacleRef} className="obstacle"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 
                0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 
                6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 
                10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" /></svg>
            </div>
        )}
        </div>
    );
};


export default DinoGame;