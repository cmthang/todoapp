Vue.createApp ({
    data() {
        return {
            tasks: [],
            task: "",

            length: 20,
            picked: ["alpha", "capitalAlpha", "Numbers", "Symbols"],

            code: "",
            codeLength: 7, 

            tables:"",
            hiddenCode: true,

            // Setting Pagination
            limit: 7,
            dataDisplay: [],
            dataPage: [],
            currentPage: 1,
            totalPages: 0,
            pageActive: 1,

            pickColor: 'Default',
        };
    },

    created() {
        this.index();
    },

    watch: {
        loading(){},
    },

    computed: {
    },

    methods: {
        index(){
            this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];   
            if (this.tasks.length > 0){
                this.paginationData(this.tasks);
                this.displayPaginationPage(this.currentPage);    
            } else {
                this.dataDisplay = this.tasks;
            }
            try {
                this.pickColor = JSON.parse(localStorage.getItem("backgroundColor"));
                if (this.pickColor){             
                    this.chooseColorBackGround(this.pickColor); 
                }      
            } catch (Ex) {
                console.log("Error Background Color: "+Ex);
            }
        },

        addTask() {
            if (this.task != "")
            {
                this.tasks.push ({
                    id: Date.now(),
                    name: this.task,
                });
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
                this.task = "";
                this.getTasks();
            }
            this.index();
        },

        removeTask(task) {
            let newTasks = this.tasks.filter(function (item){
                return task.id !== item.id;
            });
            this.tasks = newTasks;
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            this.index();
        },

        fixTask(index) {
            if (this.task != "") 
            {
                this.tasks[index]['name'] = this.task;
                this.task = "";
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
            }
            this.index();
        },

        clearInput(){
            this.task = "";
        },

        generatePassword()
        {

            const alpha = "abcdefghijklmnopqrstuvwxyz";
            const capitalAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const numbers = "0123456789";
            const symbols = "!@#$%^&*_-+=";

            const defaultLength = 20;

            let password = "";
            
            try {
                var characters ="";

                if (this.picked.includes("Symbols"))
                {
                    characters += symbols;
                }    
                if (this.picked.includes("Numbers"))
                {
                        characters += numbers;
                }
                if (this.picked.includes("alpha"))
                {
                        characters += alpha;
                }
                if (this.picked.includes("capitalAlpha"))
                {
                        characters += capitalAlpha;
                }

                var length = this.length;

                if (length != "")
                {
                    length = Math.floor(length);
                    if (length <= 47 && length > 0)
                    {
                        for (let i = 0; i < length; i++)
                        {
                            password += characters.charAt
                            (
                                Math.floor( Math.random() * characters.length )
                            );
                        }
                    }
                    else 
                    {
                        for (let i = 0; i < defaultLength; i++)
                        {
                            password += characters.charAt
                            (
                                Math.floor( Math.random() * characters.length )
                            );
                        }
                        this.length = "20";
                    }
                }
                else 
                {
                    for (let i = 0; i < defaultLength; i++)
                    {
                            password += characters.charAt
                            (
                                Math.floor( Math.random() * characters.length )
                            );
                    }
                }
            }
            catch (error)
            {
                console.log(error);
            }

            return this.task = password;
        },

        copy(getText){
            // navigator clipboard api needs a secure context (https)
            if (navigator.clipboard && window.isSecureContext) {
                // navigator clipboard api method'
                return navigator.clipboard.writeText(getText);
            } 
            else 
            {
                // text area method
                let textArea = document.createElement("textArea");
                textArea.value = getText;
                // make the textarea out of viewport
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                return new Promise((res, rej) => {
                    // here the magic happens
                    document.execCommand('copy') ? res() : rej();
                    textArea.remove();
                });
            }        

        },

        paginationData(dataPage){
            try {
                this.dataPage = dataPage;
                this.totalPages = Math.round(this.dataPage.length / this.limit);
                if(Math.round(this.dataPage.length / this.limit)<(this.dataPage.length / this.limit)){
                    this.totalPages++;
                }
            } catch (error) {
                console.log(error)
            }
        },

        displayPaginationPage(numberPage){
            try {
                this.currentPage = numberPage;
                this.pageActive = numberPage;
                var numberRowPage = Number(this.limit); //Because input text
                var totalRecords = this.dataPage.length;
                var start = (numberPage - 1) * numberRowPage;
                var end = start + numberRowPage;
                this.dataDisplay = [];
                if(end < totalRecords){
                    while(start < end){
                        this.dataDisplay.push(this.dataPage[start]);
                        start++;
                    }
                } else {
                    while(start < totalRecords){
                        this.dataDisplay.push(this.dataPage[start]);
                        start++;
                    }
                }

                //If page no records 
                if(this.dataDisplay.length < 1){
                    this.currentPage = this.currentPage - 1;
                    this.displayPaginationPage(this.currentPage);
                }
            } catch (Ex) {
                console.log("Error: "+ex);
            }
        },

        firstPage(){
            this.displayPaginationPage(1);
        },

        lastPage(){
            this.displayPaginationPage(this.totalPages);
        },

        chooseColorBackGround(pickColor){
            if (pickColor == 'Default'){
                document.getElementById('html').style.backgroundColor = '#fcdad5';
            }
            if (pickColor == 'Aquamarine'){
                document.getElementById('html').style.backgroundColor = 'aquamarine';
            } 
            if (pickColor == 'Gray'){
                document.getElementById('html').style.backgroundColor = 'rgb(160,160,160)';
            }
            if (pickColor == 'Green'){
                document.getElementById('html').style.backgroundColor = 'rgb(153,255,153)';
            }
            if (pickColor == 'RedPink'){
                document.getElementById('html').style.backgroundColor = 'rgb(255,204,153)';
            }
            if (pickColor == 'Silver'){
                document.getElementById('html').style.backgroundColor = 'rgb(224,224,224)';
            }
            localStorage.setItem("backgroundColor", JSON.stringify(pickColor));
        },

    },
    
}).mount("#app");

