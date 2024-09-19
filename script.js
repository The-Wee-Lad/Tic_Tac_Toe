
let state = 2; // 0 reset 1 ongoing 2 result found
let playerTurn = 0;
let position = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1],];
const start =document.querySelector(".start");
const container = document.body.querySelector('.container');
const urls = ["./Tac.png","./Toe.png"];
const strings = ["Player turn: 1","Player turn: 2","Player 1 wins","Player 2 wins","Draw!!!" ];
const updatePlayerDiv = (string)=>{
    let player = document.querySelector('.player')
    player.textContent=string;
}
const check = ()=>{
    let winner = 0;
    if(position[0][0] == position[1][1] && position[1][1] == position[2][2])
        winner = position[0][0]+1;
    if(position[0][2] == position[1][1] && position[1][1] == position[2][0])
        winner = position[1][1]+1;
    console.log("Diagonal : "+winner);
    if(winner == 0)
    {
        let row = 0, col = 0
        for(let i = 0; i < 3; i++)
        {
            row = position[i][0]+1, col = position[0][i]+1;
            for(let j = 0; j< 3; j++)
            {
                if(position[i][j]+1!=row)
                    row = 0;
                if(position[j][i]+1!=col)
                    col = 0    
            }
            winner = winner|col|row;
            if(winner)
                break;
        }
    }
    return winner;
};
let stateChanger = ()=>
    {
        if(state == 0)
        {   
            updatePlayerDiv(strings[0]);
            start.style.backgroundColor = 'Red';
            start.textContent = 'RESET';
            state = 1;  
            console.log("STATE :"+state)
        }
        else if(state == 1 || state == 2)
        {
            updatePlayerDiv("Press Start To Begin!!");
            start.style.backgroundColor = 'green';
            start.textContent = 'START';
            state = 0;
            console.log("STATE : "+state) 
            for(let i = 0; i < 3; i++)
                for(let j = 0; j< 3; j++)
                    position[i][j]=-1;
            let grid = document.querySelectorAll('.box img')
            for(let i = 0; i < 9; i++)
                if(grid[i].src!='')
                    {
                        grid[i].src='';
                        grid[i].style.display = 'none';
                    }
            playerTurn = 0;
            // window.location.reload();
        }
    }

// updatePlayerDiv("Press Start To Begin!!");
stateChanger();
start.addEventListener("click",stateChanger);
start.addEventListener("mouseover",()=>{start.style.backgroundColor=(state == 0)?"chartreuse":"rgb(251, 59, 59)";});
start.addEventListener("mouseout",()=>{start.style.backgroundColor=(state == 0)?"green":"red";});
container.addEventListener("click",play);



function play(event) {
        if(event.target.children[0] && !(state==2 || state==0))
        {
            //console.log("player turn : "+playerTurn);
            let select = (event.target.id)-1;
            console.log(Math.floor(select/3));
            position[Math.floor(select/3)][select%3]= playerTurn%2;
            event.target.children[0].style.display="block";
            event.target.children[0].src = urls[playerTurn%2];
            playerTurn++;
            let result = check();
            if(result)
            {
                updatePlayerDiv(strings[result+1]);
                state = 2;
            }
            else if(playerTurn>8)
            {
                updatePlayerDiv(strings[4]);
                state = 2;
            }
            else
                updatePlayerDiv(strings[(playerTurn%2)]);
        }
    console.log(position);
}
