Vue.createApp ({
    data() {
        return {
            tasks: [],
            task: "",
        };
    },
    created() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    },
    methods: {
        addTask() {
            if (this.task)
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

        fixTask(task, index) {
            if (this.task) 
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

            let defaultLength = 20;
            let length;

            let characters = alpha + capitalAlpha + numbers + symbols;

            let password = "";
            
            try {
                if (this.task != "")
                {
                    length = Math.floor(this.task);
                    if (length < 40)
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
            // alert("Generate password "+password.length+" characters");
            return this.task = password;
        },

        copy(task){
            navigator.clipboard.writeText(task.name);
        }

    },
}).mount("#app");