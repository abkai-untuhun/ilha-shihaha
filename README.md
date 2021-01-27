# ilha-shihaha
drops in the air, a js project

Welcome to the ilha-shihaha wiki!

# Ilha-shihaha means the falling of the flowers.

This javascript based project, ilha-shihaha, allows users to add flower drop effect on their pages.

It also includes snow drop effect and rain drop effect, which makes the effects changing along with the climate to be a possibility.

# How to

First include the .js file to your page by adding <script type="text/javascript" src="src/js/ilha-shihaha/air-drop.min.js"></script>

Second call the function in your javascript code, for example:


    $(function(){
        $.fn.airDrops({
            dropType:'flower',
            minSize: 5,
            offsetSize: 50,
            newIn: 300
        });
    });

