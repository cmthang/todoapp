Vue.createApp ({
    data() {
        return {
            tasks: [],
            task: "",

            length: 20,
            picked: ["alpha", "capitalAlpha", "Numbers", "Symbols"],

            code: "AddingCode",
            codeLength: 7, 

            fullData: [],
            accounts: [],
        };
    },
    created() {
        try
        {
            this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];   
            this.fullData = JSON.parse(localStorage.getItem("fullData")) || [];
            this.flagAccount();
        }
        catch (e){
            console.log(e);
        }
    },

    watch: {
        loading(){},
    },

    computed: {
        loading(){
            this.accounts = this.fullData.filter((data)=>{
                return this.code == data.code;
            });
        },
    },

    methods: {
        addTask() {
            if (this.task != "")
            {
                this.tasks.push ({
                    id: Date.now(),
                    name: this.task,
                });
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
                this.task = "";
            }
        },

        removeTask(task) {
            let newTasks = this.tasks.filter(function (item){
                return task.id !== item.id;
            });
            this.tasks = newTasks;
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
        },

        fixTask(index) {
            if (this.task != "") 
            {
                this.tasks[index]['name'] = this.task;
                this.task = "";
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
            }
        },

        clearInput(){
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
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

        isClean(){
            localStorage.setItem("fullData", []);
        },

        getData(){

            const options = {
                method: 'GET',
                url: 'https://apichallengermydragon.000webhostapp.com/api/account',
            }

            try {
                axios.request(options).then((response) =>
                {
                    this.fullData = response.data;
                    localStorage.setItem("fullData", JSON.stringify(this.fullData));
                })
    
            }
            catch(err){
                console.log(err);
            }

        },

        isRedirect(link){
            window.open(link);
        },

        flagAccount(){
            if(this.code.length >= this.codeLength)
                return true;    
            return false;
        },

        isTakes(){
            this.getData();
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

        }
    },
}).mount("#app");