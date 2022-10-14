<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NoteText</title>
        <link rel="stylesheet" href="app.css">
        <link rel="shortcut icon" href="/src/1.jpg">
    </head>
    <body>
        <div id="app">

            <?php
                include "./component_html/title.html" 
            ?>

            <?php 
                include "./component_html/code.html"
            ?>

            <?php
                include "./component_html/generate-password.html"
            ?>
                
            <?php
                include "./component_html/input.html"
            ?>

            <?php
                include "./component_html/list.html"
            ?>

            <?php
                // include "./component_html/hide-table.html"
            ?>

            <?php
                // include "./component_html/modal-edit-hide-table.html"
            ?>

        </div>          
   
        <?php
            include "./component_html/module/module.html"
        ?>

    </body>
</html>