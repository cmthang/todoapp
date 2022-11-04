
Vue.createApp ({
    data() {
        return {
            tasks: [],
            task: "",

            length: 20,
            picked: ["alpha", "capitalAlpha", "Numbers", "Symbols"],

            code: "",
            codeLength: 7, 

            // Setting Pagination
            limit: 4,
            dataDisplay: [], // Display Records
            dataPage: [],
            currentPage: 1,
            totalPages: 0,
        };
    },

    created() {
        this.getTasks();
    },

    methods: {
        getTasks(){
            try
            {
                this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];   
                this.paginationData(this.tasks);
                this.displayPaginationPage(this.currentPage);
            }
            catch (e){
                console.log(e);
            };
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
        },

        removeTask(task) {
            let newTasks = this.tasks.filter(function (item){
                return task.id !== item.id;
            });
            this.tasks = newTasks;
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            this.getTasks();
        },

        fixTask(index) {
            if (this.task != "") 
            {
                this.tasks[index]['name'] = this.task;
                this.task = "";
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
            }
            this.getTasks();
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
                if (Math.round(this.dataPage.length / this.limit) < (this.dataPage.length / this.limit)){
                    this.totalPages++;
                }
            } catch (error) {
                console.log(error)
            }
        },

        displayPaginationPage(numberPage){
            try {
                this.currentPage = numberPage;
                var numberRowPage = Number(this.limit); //Because input text
                var totalRecords = this.dataPage.length;
                var start = (numberPage - 1) * numberRowPage;
                var end = start + numberRowPage;

                this.dataDisplay = [];
                if (end < totalRecords){
                    while (start <end){
                        this.dataDisplay.push(this.dataPage[start]);
                        start++;
                    }
                } else {
                    while (start < totalRecords){
                        this.dataDisplay.push(this.dataPage[start]);
                        start++;
                    }
                }

                // If page no records
                if (this.dataDisplay.length < 1){
                    this.currentPage = this.currentPage - 1;
                    this.displayPaginationPage(this.currentPage);
                }
            } catch (Ex) {
                console.log("Error displayPaginationPage: "+Ex);
            }
        },

        firstPage(){
            this.displayPaginationPage(1);
        },

        lastPage(){
            this.displayPaginationPage(this.totalPages);
        }
    },
    
}).mount("#app");

