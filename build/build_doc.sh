#!/usr/bin/expect -f

# 确保脚本抛出遇到的错误
set -e

# 重新生成文档
vuepress build docs

# 将文档推到远程服务器
scp -r docs/.vuepress/dist/* root@172.25.62.87:/opt/form-build-vuepress/

read -p "? 是否需要更新搜索索引(yes/no): " CHOOSE

if [ -z $CHOOSE ];then
  CHOOSE=no
fi

if [[ $CHOOSE == yes || $CHOOSE == y || $CHOOSE == Y || $CHOOSE == YES || $CHOOSE == Yes ]];then
echo -e "\n✨  正在更新索引..."
# 更新搜索索引
ssh root@172.25.62.98 "docker start docsearch-scraper"
fi

echo "✨  发布成功！"



