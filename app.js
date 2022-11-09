
Vue.createApp ({
    data() {
        return {
            tasks: [],
            task: "",

            length: 20,
            picked: ["alpha", "capitalAlpha", "Numbers", "Symbols"],

            code: "",
            codeLength: 7, 

            isShow: false,
            isHide: true,

            tables:"",
            hiddenCode: true,

            // Setting Pagination
            limit: 7,
            dataDisplay: [],
            dataPage: [],
            currentPage: 1,
            totalPages: 0,
        };
    },

    created() {
        try
        {
            this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];   
        }
        catch (e){
            console.log(e);
        };
    },

    watch: {
        loading(){},
    },

    computed: {
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

    },
    
}).mount("#app");

