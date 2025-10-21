// js/scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const firmwareTableBody = document.getElementById('firmwareTableBody');
    const loadingMessage = document.getElementById('loadingMessage');
    const noFirmwareMessage = document.getElementById('noFirmwareMessage');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const deviceFilter = document.getElementById('deviceFilter');
    const versionFilter = document.getElementById('versionFilter');
    
    // 页面加载时获取固件列表
    loadFirmwareList();
    
    // 搜索功能
    searchButton.addEventListener('click', function() {
        filterFirmwareList();
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterFirmwareList();
        }
    });
    
    // 筛选功能
    deviceFilter.addEventListener('change', filterFirmwareList);
    versionFilter.addEventListener('change', filterFirmwareList);
    
    // 加载固件列表
    function loadFirmwareList() {
        // 显示加载状态
        loadingMessage.style.display = 'block';
        noFirmwareMessage.style.display = 'none';
        firmwareTableBody.innerHTML = '';
        
        // 获取固件数据
        const firmwareFiles = getFirmwareData();
        
        // 隐藏加载状态
        loadingMessage.style.display = 'none';
        
        if (firmwareFiles.length > 0) {
            displayFirmwareList(firmwareFiles);
        } else {
            // 如果没有固件文件，显示提示信息
            noFirmwareMessage.style.display = 'block';
        }
    }
    
    // 获取固件数据的函数（人工维护的固件列表）
    function getFirmwareData() {
        // 人工维护的固件列表，包含真实文件信息
        return [
            {
                name: 'xiaozhi.bin',
                device: '小智1.69寸LCD横屏版',
                version: 'v1.0.0',
                date: '2025-10-10', // 真实文件日期
                size: '2.54 MB', // 真实文件大小
                type: 'stable',
                path: 'images/xiaozhi.bin'
            }
            // 当添加新固件时，在此处添加新的对象
        ];
    }
    
    // 显示固件列表
    function displayFirmwareList(files) {
        let tableRows = '';
        
        files.forEach(function(file) {
            const badgeClass = file.type === 'beta' ? 'beta' : file.type === 'preview' ? 'preview' : 'stable';
            const badgeText = file.type === 'beta' ? '测试版' : file.type === 'preview' ? '预览版' : '稳定版';
            
            tableRows += `
                <tr>
                    <td>${file.name}</td>
                    <td>${file.device}</td>
                    <td>${file.version}</td>
                    <td>${file.date}</td>
                    <td>${file.size}</td>
                    <td><span class="badge ${badgeClass}">${badgeText}</span></td>
                    <td><a href="${file.path}" download class="download-btn">下载</a></td>
                </tr>
            `;
        });
        
        firmwareTableBody.innerHTML = tableRows;
        
        // 为下载按钮添加事件监听器
        const downloadButtons = document.querySelectorAll('.download-btn');
        downloadButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // 这里可以添加下载统计逻辑
                console.log('下载文件:', this.getAttribute('href'));
            });
        });
    }
    
    // 筛选固件列表
    function filterFirmwareList() {
        const searchTerm = searchInput.value.toLowerCase();
        const deviceValue = deviceFilter.value;
        const versionValue = versionFilter.value;
        
        // 获取所有固件数据
        const allFiles = getFirmwareData();
        
        // 应用筛选条件
        let filteredFiles = allFiles;
        
        // 按设备筛选
        if (deviceValue !== 'all') {
            filteredFiles = filteredFiles.filter(file => {
                // 这里可以根据实际需求调整筛选逻辑
                return deviceValue === 'device1' ? file.device.includes('0.96寸') : 
                       deviceValue === 'device2' ? file.device.includes('1.69寸') :
                       deviceValue === 'device3' ? file.device.includes('1.69寸') : true;
            });
        }
        
        // 按版本类型筛选
        if (versionValue !== 'all') {
            filteredFiles = filteredFiles.filter(file => file.type === versionValue);
        }
        
        // 按搜索词筛选
        if (searchTerm) {
            filteredFiles = filteredFiles.filter(file => 
                file.name.toLowerCase().includes(searchTerm) ||
                file.device.toLowerCase().includes(searchTerm) ||
                file.version.toLowerCase().includes(searchTerm)
            );
        }
        
        // 显示筛选后的结果
        if (filteredFiles.length > 0) {
            displayFirmwareList(filteredFiles);
            noFirmwareMessage.style.display = 'none';
        } else {
            firmwareTableBody.innerHTML = '';
            noFirmwareMessage.style.display = 'block';
        }
    }
    
    // 展开/收起更新详情
    const detailsButtons = document.querySelectorAll('.details-btn');
    detailsButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const version = this.getAttribute('data-version');
            const detailsElement = document.getElementById(`details-${version}`);
            if (detailsElement.style.display === 'block') {
                detailsElement.style.display = 'none';
                this.textContent = '查看详情';
            } else {
                detailsElement.style.display = 'block';
                this.textContent = '收起详情';
            }
        });
    });
    
    
    // 模态框功能
    const modal = document.getElementById('downloadStatsModal');
    const closeModal = document.querySelector('.close-modal');
    
    // 关闭模态框
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
