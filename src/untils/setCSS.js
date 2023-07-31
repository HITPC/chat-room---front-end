export default function setCssVarible(index, that){
  switch(index){
    case 1:{
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 0, .5)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(66,75,70)');
      document.documentElement.style.setProperty('--text-color', 'rgb(239,232,215)');
      document.documentElement.style.setProperty('--border-color', 'rgb(66,75,70)');
      document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
    case 2: {
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(255, 255, 255, .4)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(240,228,234)');
      document.documentElement.style.setProperty('--text-color', 'rgb(93,146,196)');
      document.documentElement.style.setProperty('--border-color', 'rgb(240,228,234)');
      document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
    case 3: {
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 0, .5)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(110,73,89)');
      document.documentElement.style.setProperty('--text-color', 'rgb(247,187,184)');
      document.documentElement.style.setProperty('--border-color', 'rgb(110,73,89)');
      document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
    case 4: {
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 102, .2)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(24,43,73)');
      document.documentElement.style.setProperty('--text-color', 'rgba(211,206,110)');
      document.documentElement.style.setProperty('--border-color', 'rgb(24,43,73)');
      document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
    case 5: {
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 102, .2)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(240,196,219)');
      document.documentElement.style.setProperty('--text-color', '#fff9f9');
      document.documentElement.style.setProperty('--border-color', 'rgb(240,196,219)');
      document.documentElement.style.setProperty('--text-border-color', 'rgb(0,0,0)');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
    case 6: {
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 0, .5)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(57,55,69)');
      document.documentElement.style.setProperty('--text-color', 'rgb(155,213,207)');
      document.documentElement.style.setProperty('--border-color', 'rgb(57,55,69)');
      document.documentElement.style.setProperty('--text-border-color', 'rgb(188,128,216)');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
    case 7: {
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(149,165,237, .2)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(63,71,84)');
      document.documentElement.style.setProperty('--text-color', 'rgb(136,197,131)');
      document.documentElement.style.setProperty('--border-color', 'rgb(63,71,84)');
      document.documentElement.style.setProperty('--text-border-color', 'gray');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
    case 8: {
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(255, 255, 255, .4)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(255,255,255)');
      document.documentElement.style.setProperty('--text-color', 'rgb(194,93,69)');
      document.documentElement.style.setProperty('--border-color', 'rgb(255,255,255)');
      document.documentElement.style.setProperty('--text-border-color', 'rgb(255,255,255)');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
    case 9: {
      document.documentElement.style.setProperty('--menu-container-bgc', 'rgba(0, 0, 0, .3)');
      document.documentElement.style.setProperty('--button-bgc', 'rgb(16,70,97)');
      document.documentElement.style.setProperty('--text-color', 'rgb(144, 184, 193)');
      document.documentElement.style.setProperty('--border-color', 'rgb(16,70,97)');
      document.documentElement.style.setProperty('--text-border-color', 'gray');
      that.$refs["main"].style.backgroundImage = `url(${that.themeList[index-1].url})`;
      break;
    }
  }
}