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
    const typeFilter = document.getElementById('typeFilter');
    
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
    typeFilter.addEventListener('change', filterFirmwareList);
    
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
                name: 'xiaozhibox-096oled.bin',
                device: '小智盒子0.96寸OLED版',
                version: 'v1.0.0',
                date: '2025-10-22',
                size: '2.1 MB',
                type: 'stable',
                path: 'images/xiaozhibox-096oled.bin'
            },
            {
                name: 'xiaozhibox-169lcd.bin',
                device: '小智盒子1.69寸LCD版',
                version: 'v1.0.0',
                date: '2025-10-22',
                size: '2.5 MB',
                type: 'stable',
                path: 'images/xiaozhibox-169lcd.bin'
            },
            {
                name: 'xiaozhibox-169lcd-wechat_style.bin',
                device: '小智盒子1.69寸LCD微信风格版',
                version: 'v1.0.0',
                date: '2025-10-22',
                size: '2.6 MB',
                type: 'stable',
                path: 'images/xiaozhibox-169lcd-wechat_style.bin'
            },
            {
                name: 'xiaozhibox-cam-154lcd.bin',
                device: '小智盒子摄像头1.54寸LCD版',
                version: 'v1.0.0',
                date: '2025-10-22',
                size: '3.2 MB',
                type: 'stable',
                path: 'images/xiaozhibox-cam-154lcd.bin'
            }
            // 当添加新固件时，在此处添加新的对象
        ];
    }
    
    // 显示固件列表
    function displayFirmwareList(firmwareFiles) {
        firmwareTableBody.innerHTML = '';
        
        firmwareFiles.forEach(firmware => {
            const row = document.createElement('tr');
            const typeClass = firmware.type === 'stable' ? 'stable' : 'beta';
            const typeText = firmware.type === 'stable' ? '稳定版' : '测试版';
            
            row.innerHTML = `
                <td><span class="filename">${firmware.name}</span></td>
                <td>${firmware.device}</td>
                <td><span class="version-tag">${firmware.version}</span></td>
                <td>${firmware.date}</td>
                <td>${firmware.size}</td>
                <td><span class="type-badge ${typeClass}">${typeText}</span></td>
                <td><a href="${firmware.path}" download="${firmware.name}" class="download-btn">下载</a></td>
            `;
            firmwareTableBody.appendChild(row);
        });
    }
});