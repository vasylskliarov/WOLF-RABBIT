;

/*--------------------------MODEL---------------------------*/
/*------------------- Class deffinitions -------------------*/
/*----------------------------start-------------------------*/
var PersonageEnum = Object.freeze({
    EMPTY: {value: 0, name: "пустая ячейка"},
    WOLF: {value: 1, name: "волк"},
    RABBIT: {value: 2, name: "заяц"},
    BASH: {value: 3, name: "куст"},
    TREE: {value: 4, name: "дерево"}
});



/*--start---------- Game objects base class ----------------*/
function GameObjects(personage){
    this.personage = personage;
    this.getPersonage = function(){ return this.personage; };
}
/*--end------------ Game objects base class ----------------*/



/*--start----------- EmptySpace base class -----------------*/
function EmptySpace(){
    this.personage = PersonageEnum.EMPTY;
}
EmptySpace.prototype = new GameObjects();
/*--end------------- EmptySpace base class -----------------*/



/*--start------------ Animals base class -------------------*/
function Animals() {
    this.sprintSpeed;

    //start getters and setters
    this.getSprintSpeed = function(){ return this.speed; };
    this.setSprintSpeed = function(sprintSpeed){ this.sprintSpeed = sprintSpeed; };
    //end getters and setters
}
Animals.prototype = new GameObjects();
/*--end-------------- Animals base class -------------------*/



/*--start--------- Wolf class extends Animals --------------*/
function Wolf(sprintSpeed, lengthOfLife){
    this.personage = PersonageEnum.WOLF;
    this.sprintSpeed = sprintSpeed;
    this.lengthOfLife = lengthOfLife;


    this.getLengthOfLife = function (){
        return lengthOfLife;
    }
    this.becomeOlder = function (){
        this.lengthOfLife -= 1;
    }
    this.isAlive = function(){
        if(lengthOfLife > 0){
            return true;
        }else{
            return false;
        }
    }
}
Wolf.prototype = new Animals();
/*--end----------- Wolf class extends Animals --------------*/



/*--start------- Rabbit class extends Animals --------------*/
function Rabbit(sprintSpeed) {
    this.personage = PersonageEnum.RABBIT;
    this.sprintSpeed = sprintSpeed;
}
Rabbit.prototype = new Animals();
/*--end--------- Rabbit class extends Animals --------------*/



/*--start----- Plants class extends Game objects -----------*/
function Plants(lengthOfLife) {
    this.lengthOfLife = lengthOfLife;

    this.getLengthOfLife = function (){
        return this.lengthOfLife;
    }
    this.becomeOlder = function (){
        this.lengthOfLife-=1;
    }
    this.isAlive = function(){
        if(lengthOfLife > 0){
            return true;
        }else{
            return false;
        }
    }
}
Plants.prototype = new GameObjects();
/*--end------- Plants class extends Game objects -----------*/



/*--start--------- Bash class extends Plants ---------------*/
function Bash (lengthOfLife){
    this.personage = PersonageEnum.BASH;
    this.lengthOfLife = lengthOfLife;
}
Bash.prototype = new Plants();
/*--start--------- Bash class extends Plants ---------------*/

/*--start--------- Tree class extends Plants ---------------*/
function Tree (lengthOfLife){
    this.personage = PersonageEnum.TREE;
    this.lengthOfLife = lengthOfLife;
}
Tree.prototype = new Plants();
/*--start--------- Tree class extends Plants ---------------*/

/*--start------------- Base view class ---------------------*/
function BaseView (grid){
    this.grid = grid;

    this.createGridView = function (){};
    this.updateGridView = function (){};
}
/*--end--------------- Base view class ---------------------*/



/*--start------------- HTML view class ---------------------*/
function HTMLView (grid){
    var grid = grid;
    //TODO finish this method
    this.createGridView = function (){};
    //TODO finish this method
    this.updateGridView = function (posX, posY){};
}
HTMLView.prototype = new BaseView();
/*--end--------------- HTML view class ---------------------*/



/*--start------------ GameController class -----------------*/
function GameController(gridSize, gameSpeed, treesQuantity, treesLengthOfLife, bushQuantity, bushLengthOfLife, rabbitSprintSpeed, wolfSprintSpeed, wolfLengthOfLife){
    var gridSize = gridSize;
    var grid = [];
    var gameSpeed = gameSpeed;
    var treesQuantity = treesQuantity;
    var treesLengthOfLife = treesLengthOfLife;
    var bushQuantity = 	bushQuantity;
    var bushLengthOfLife = 	bushLengthOfLife;
    var rabbitSprintSpeed = rabbitSprintSpeed;
    var wolfSprintSpeed = wolfSprintSpeed;
    var wolfLengthOfLife = wolfLengthOfLife;
    var WINNER = PersonageEnum.EMPTY.value;

    //start getters and setters
    this.getGridSize = function(){ return gridSize};
    this.getTreesQuantity = function(){ return treesQuantity};
    this.getTreesLengthOfLife = function(){ return treesLengthOfLife};
    this.getBushQuantity = function(){ return bushQuantity};
    this.getBushLengthOfLife = function(){ return bushLengthOfLife};
    this.getRabbitSprintSpeed = function(){ return rabbitSprintSpeed};
    this.getWolfSprintSpeed = function(){ return wolfSprintSpeed};
    this.getWolfLengthOfLife = function(){ return wolfLengthOfLife};
    this.getWolfLengthOfLife = function(){ return wolfLengthOfLife};
    this.getGrid = function(){ return grid};
    this.getGameSpeed = function() {return gameSpeed};
    this.getWINNER = function() {return WINNER};
    //end getters and setters

    this.createGrid = function(){
        for(var i = 0; i < gridSize; i++){
            grid [i] = [];
            for(var j = 0; j < gridSize; j++){
                grid [i][j] = new EmptySpace();
            }
        }
        return grid;
    }

    this.getBooleanRandom = function(){
        var result = Math.floor(Math.random() * 2);
        if(result === 1){
            return true;
        }else{
            return false;
        }
    }

    this.emptySpaceCount = function(){
        var emptySpace = 0;
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++){
                if(grid [i][j].personage.value === PersonageEnum.EMPTY.value){
                    emptySpace++;
                }
            }
        }
        return emptySpace;
    }
    this.isEmptyCord = function(x, y){
        if(x >= 0 && y >= 0 && x < grid.length && y < grid[x].length && grid [x][y].personage.value === PersonageEnum.EMPTY.value){
            return true;
}       else {
            return false;
        }
    }

    this.isRabbitNear = function(x, y){
        if((x-1) >= 0 && (y-1) >= 0 && (x-1) < gridSize && (y-1) < gridSize && grid [(x-1)][(y-1)].personage.value === PersonageEnum.RABBIT.value){
            console.log("ВНИМАНИЕ!!! ВОЛК ПОЙМАЛ ЗАЙЦА!!!");
            return true;
        }else if(x >= 0 && (y-1) >= 0 && x < gridSize && (y-1) < gridSize && grid [x][(y-1)].personage.value === PersonageEnum.RABBIT.value){
            console.log("ВНИМАНИЕ!!! ВОЛК ПОЙМАЛ ЗАЙЦА!!!");
            return true;
        }else if((x+1) >= 0 && (y-1) >= 0 && (x+1) < gridSize && (y-1) < gridSize && grid [(x+1)][(y-1)].personage.value === PersonageEnum.RABBIT.value){
            console.log("ВНИМАНИЕ!!! ВОЛК ПОЙМАЛ ЗАЙЦА!!!");
            return true;
        }else if((x+1) >= 0 && y >= 0 && (x+1) < gridSize && y < gridSize && grid [(x+1)][y].personage.value === PersonageEnum.RABBIT.value){

            console.log("ВНИМАНИЕ!!! ВОЛК ПОЙМАЛ ЗАЙЦА!!!");
            return true;
        }else if((x+1) >= 0 && (y+1) >= 0 && (x+1) < gridSize && y + 1 < gridSize && grid [(x+1)][(y+1)].personage.value === PersonageEnum.RABBIT.value){
            console.log("ВНИМАНИЕ!!! ВОЛК ПОЙМАЛ ЗАЙЦА!!!");
            return true;
        }else if(x >= 0 && (y+1) >= 0 && x < gridSize && (y+1) < gridSize && grid [x][(y+1)].personage.value === PersonageEnum.RABBIT.value){
            console.log("ВНИМАНИЕ!!! ВОЛК ПОЙМАЛ ЗАЙЦА!!!");
            return true;
        }else if((x-1) >= 0 && (y+1) >= 0 && (x-1) < gridSize && (y+1) < gridSize && grid [(x-1)][(y+1)].personage.value === PersonageEnum.RABBIT.value){
            console.log("ВНИМАНИЕ!!! ВОЛК ПОЙМАЛ ЗАЙЦА!!!");
            return true;
        }else if((x-1) >= 0 && y >= 0 && (x-1) < gridSize && (y+1) < gridSize && grid [(x-1)][y].personage.value === PersonageEnum.RABBIT.value){
            console.log("ВНИМАНИЕ!!! ВОЛК ПОЙМАЛ ЗАЙЦА!!!");
            return true;
        }else{
            return false;
        }
    }

    this.putObjInRandomSpace = function(gameObject){
        if(this.emptySpaceCount() > 0){
            var randX;
            var randY;
            do{
                randX = Math.floor( Math.random() * grid.length );
                randY = Math.floor( Math.random() * grid[randX].length );
            }while(grid[randX][randY].personage.value != PersonageEnum.EMPTY.value);
            //TODO finish it
            grid[randX][randY] = gameObject;
            console.log("" + gameObject.getPersonage().name + " X= " + randX + " Y= " + randY);
            return true;
        }else {
            return false;
        }
    }

    this.wolfMotion = function(){
        var wolfSteps;
        var wolfObject;
        var wolfCurrCordX;
        var wolfCurrCordY;
        var wolfNextCordX;
        var wolfNextCordY;
        var rebCordX;
        var rebCordY;
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++){
                if(grid [i][j].personage.value === PersonageEnum.RABBIT.value){
                    rebCordX = i;
                    rebCordY = j;
                }else if(grid [i][j].personage.value === PersonageEnum.WOLF.value){
                    wolfObject = grid [i][j];
                    wolfSteps = wolfObject.sprintSpeed;
                    wolfCurrCordX = i;
                    wolfCurrCordY = j;
                }
            }
        }
        console.log(wolfObject.personage.name + " на X= " + wolfCurrCordX + " Y= " + wolfCurrCordY + " и идет на " + wolfSteps + " клеток");
        console.log("Заяц на X= " + rebCordX + " Y= " + rebCordY);

        if(this.isRabbitNear(wolfCurrCordX, wolfCurrCordY)){
            wolfSteps = 0;
        }
        while(wolfSteps > 0){
            var vector = new Array(2);
            if(wolfCurrCordX > rebCordX){
                vector[0] = "left";
            }else if(wolfCurrCordX < rebCordX){
                vector[0] = "right";
            }else{
                vector[0] = "needNot";
            }

            if(wolfCurrCordY > rebCordY){
                vector[1] = "up";
            }else if(wolfCurrCordY < rebCordY){
                vector[1] = "down";
            }else{
                vector[1] = "needNot";
            }

            if(vector[0] == "left" && vector[1] == "up"){
                if( this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                }
            } else if(vector[0] == "left" && vector[1] == "down"){
                if( this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                }
            } else if(vector[0] == "left" && vector[1] == "needNot"){
                if( this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                }
            } else if(vector[0] == "right" && vector[1] == "up"){
                if( this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                }
            } else if(vector[0] == "right" && vector[1] == "down"){
                if( this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                }
            } else if(vector[0] == "right" && vector[1] == "needNot"){
                if( this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                }
            } else if(vector[0] == "needNot" && vector[1] == "up"){
                if( this.isEmptyCord(wolfCurrCordX, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY - 1)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY - 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                }
            } else if(vector[0] == "needNot" && vector[1] == "down"){
                if( this.isEmptyCord(wolfCurrCordX, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX - 1, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX - 1;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                } else if(this.isEmptyCord(wolfCurrCordX + 1, wolfCurrCordY + 1)){
                    wolfNextCordX = wolfCurrCordX + 1;
                    wolfNextCordY = wolfCurrCordY + 1;
                    grid [wolfNextCordX][wolfNextCordY] = grid [wolfCurrCordX][wolfCurrCordY];
                    grid [wolfCurrCordX][wolfCurrCordY] = new EmptySpace();
                }
            }
            wolfCurrCordX = wolfNextCordX;
            wolfCurrCordY = wolfNextCordY;
            if(this.isRabbitNear(wolfCurrCordX, wolfCurrCordX)){
                wolfSteps = 0;
            }
            console.log("У волка еще " + wolfSteps + " шагов, сейчас он на координатах X= " + wolfCurrCordX + " Y= " + wolfCurrCordY + " Должен идти по X = " + vector[0] +" Y= " + vector[1]);
            wolfSteps--;
        }

    }


    this.allGettingOlder = function(){
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++){
                switch(grid [i][j].personage.value){
                    case PersonageEnum.WOLF.value:
                        var prevVal = grid [i][j].lengthOfLife;
                        grid [i][j].becomeOlder();
                        console.log("было " + prevVal + " стало " + grid [i][j].lengthOfLife + " Волк постарел");
                            if(!grid [i][j].isAlive()){
                                WINNER = PersonageEnum.RABBIT.value;
                            }
                        break;
                    case PersonageEnum.TREE.value:
                        var prevVal = grid [i][j].lengthOfLife;
                        grid [i][j].becomeOlder();
                        console.log("было " + prevVal + " стало " + grid [i][j].lengthOfLife + " дерево постарело");
                        if(grid [i][j].lengthOfLife == 0){
                            console.log("дерево умерло");
                            grid [i][j] = new EmptySpace();
                        }
                        break;
                    case PersonageEnum.BASH.value:
                        var prevVal = grid [i][j].lengthOfLife;
                        grid [i][j].becomeOlder();
                        console.log("было " + prevVal + " стало " + grid [i][j].lengthOfLife + " куст постарел");
                        if(grid [i][j].lengthOfLife == 0){
                            console.log("куст умер");
                            grid [i][j] = new EmptySpace();
                        }
                        break;
                    default: break;
                }
            }
        }
    }

    this.isWolfAlive  = function(){
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++){
                if(grid [i][j].personage.value === PersonageEnum.WOLF.value){
                    return grid [i][j].isAlive();
                }
            }
        }
    }

    this.growPlants = function(){
        if(this.getBooleanRandom()){
            this.putObjInRandomSpace(new Tree(this.getTreesLengthOfLife()));
            console.log("Посадил дерево");
        }
        if(this.getBooleanRandom()){
            this.putObjInRandomSpace(new Bash(this.getBushLengthOfLife()));
            console.log("Посадил куст");
        }
    }


    this.firstTimeSetUpGameObjects = function(){
        this.createGrid();
        var rabbit= new Rabbit(rabbitSprintSpeed);
        this.putObjInRandomSpace(rabbit);
        var wolf = new Wolf(wolfSprintSpeed, wolfLengthOfLife);
        this.putObjInRandomSpace(wolf);
        if( treesQuantity + bushQuantity + 1 + 1 < gridSize * gridSize){
            for(var i = 0; i < treesQuantity; i++){
                this.putObjInRandomSpace(new Tree(this.getTreesLengthOfLife()));
            }
            for(var i = 0; i < bushQuantity; i++){
                this.putObjInRandomSpace(new Bash(this.getBushLengthOfLife()));
            }
        }
    }




    this.play = function(){
        this.firstTimeSetUpGameObjects();
            this.wolfMotion();
            this.allGettingOlder();
            if(!this.isWolfAlive()){
                WINNER.value = PersonageEnum.RABBIT.value;
            }
        this.drawHTMLVue();
        this.drawWINER(WINNER);
    }



    this.drawWINER = function(personage){
        if(personage.value === PersonageEnum.RABBIT.value){
            console.log("Заяц победил");
        }else{
            console.log("Волк победил");
        }

    }


    this.drawHTMLVue = function(){
        resString = "";


            for(var i = 0; i < grid.length; i++){
                resString += "\n<div class='position:relative;'>\n";
                for(var j = 0; j < grid[i].length; j++){
                    resString += " <div class='gamePlace gamePlaceRow' \n> " + grid [i][j].personage.name + " </div>\n ";

                }
                resString += "\n</div>\n";

                //if(i===0){
                //    gameField.append("<div>").attr('id', "row_" + i);
                //}else{
                //    gameField.append("<div>").attr('id', "row_" + i);
                //}
                //var currDiv = $( "#" + "row_" + i);

                //$( "#game-field" ).append("<div>").attr('id', "cell_" + i + "_" + j).text(grid [i][j].personage.name);

            }

            $( "#game-field" ).append(resString);
        }







}


/*--end-------------- GameController class -----------------*/




/*---------------------------end----------------------------*/
/*------------------- Class deffinitions -------------------*/
/*----------------------------------------------------------*/





/*----------------------------------------------------------*/
/*----------------------- Test part ------------------------*/
/*--------------------------start---------------------------*/

var test = new GameController(10, 1000, 4, 4, 2, 6, 4, 10, 10);

$(document).ready(test.play());
/*---------------------------end----------------------------*/
/*----------------------- Test part ------------------------*/
/*----------------------------------------------------------*/